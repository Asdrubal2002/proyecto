from django.core.mail import send_mail
from django.template.loader import render_to_string
from django.utils.html import strip_tags

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Invoice
from .serializers import InvoiceSerializer, CreateInvoiceSerializer
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404
from django.db.models import Sum
from apps.cart.models import Cart
from apps.shipping.models import Shipping
from io import BytesIO
from django.http import FileResponse
from decimal import Decimal


class UserInvoicesAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        # Obtener todas las facturas del usuario actual
        user_invoices = Invoice.objects.filter(buyer__user=request.user).order_by(
            "-created_at"
        )

        serializer = InvoiceSerializer(user_invoices, many=True)

        invoices_count = len(user_invoices)

        response_data = {
            "invoices": serializer.data,
            "invoices_count": invoices_count,
        }

        # Retornar la lista de facturas en formato JSON
        return Response(response_data, status=status.HTTP_200_OK)

def send_invoice_email(invoice, user):
    subject = "Confirmación de Compra - Orden #{}".format(invoice.transaction_number)
    html_message = render_to_string("invoices/invoice_created_email.html", {"invoice": invoice})
    plain_message = strip_tags(html_message)
    from_email = (
        "tu_email@example.com"  # Reemplaza con tu dirección de correo electrónico
    )
    to_email = user.email
    send_mail(subject, plain_message, from_email, [to_email], html_message=html_message)

class AddInvoiceAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = CreateInvoiceSerializer(data=request.data)
        if serializer.is_valid():
            # Guarda la factura sin el campo total_amount
            invoice = serializer.save()

            # Calcula el total del carrito
            cart_id = request.data.get("cart")
            cart = get_object_or_404(Cart, id=cart_id)
            total_amount = cart.total_sin_impuestos + cart.total_impuestos

            # Obtén el precio del método de envío seleccionado
            shipping_method_id = request.data.get("shipping_method")
            if shipping_method_id:
                shipping_method = get_object_or_404(Shipping, id=shipping_method_id)
                # Parsear el precio a un número flotante
                shipping_price = float(shipping_method.price)
                # Convertir total_amount a Decimal y luego sumarle shipping_price
                total_amount = Decimal(total_amount) + Decimal(shipping_price)

            # Acceder a la información del país desde la factura
            country_decimal_places = invoice.shipping_location.city.estado_o_departamento.pais.currency.decimal_places

            # Formatear el total_amount según los decimales del país
            formatted_total_amount = "{:,.{dp}f}".format(total_amount, dp=country_decimal_places)

            # Guardar el total_amount formateado en la factura
            invoice.total_amount = formatted_total_amount
            invoice.save()

            # Envía el correo electrónico
            send_invoice_email(invoice, request.user)

            # Desactiva el carrito
            cart.is_active = False
            cart.save()

            # Devuelve la respuesta con el total_amount formateado
            return Response({"success": "Listo", "total_amount": formatted_total_amount}, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class DeleteInvoiceAPIView(APIView):
    def delete(self, request):
        # Verifica si se proporcionó un ID de factura en el cuerpo de la solicitud
        invoice_id = request.data.get("invoice_id")
        if not invoice_id:
            return Response(
                {"error": "Se requiere un ID de factura en el cuerpo de la solicitud."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # Busca la factura por su ID o devuelve un error 404 si no se encuentra
        try:
            invoice = Invoice.objects.get(id=invoice_id)
        except Invoice.DoesNotExist:
            return Response(
                {"error": "La factura no existe."}, status=status.HTTP_404_NOT_FOUND
            )

        # Verifica si el estado de la factura es "Pendiente"
        if invoice.status.name != "Pendiente":
            return Response(
                {"error": "Tu pedido ya está en proceso y no puede ser eliminado."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # Guarda el ID del carrito asociado a la factura
        cart_id = invoice.cart_id

        # Elimina la factura
        invoice.delete()

        # Actualiza el carrito para activarlo nuevamente
        try:
            cart = Cart.objects.get(id=cart_id)
            cart.is_active = True
            cart.save()
        except Cart.DoesNotExist:
            pass  # Manejar el caso si el carrito no existe

        # Renderizar la plantilla HTML para el correo electrónico
        html_message = render_to_string("invoices/invoice_delete_email.html", {"invoice": invoice})
        
        # Enviar correo electrónico al usuario
        subject = "Cancela correctamente la orden #{}".format(invoice.transaction_number)
        from_email = "tu_correo@example.com"
        to_email = [request.user.email]
        send_mail(
            subject,
            strip_tags(html_message),
            from_email,
            to_email,
            html_message=html_message,
            fail_silently=True,
        )

        # Devuelve una respuesta de éxito
        return Response(
            {
                "message": "La factura se ha eliminado correctamente y el carrito se ha activado nuevamente. Se ha enviado un correo electrónico al usuario."
            },
            status=status.HTTP_204_NO_CONTENT,
        )
