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

from io import BytesIO
from django.http import FileResponse
from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
import os
from reportlab.lib.styles import getSampleStyleSheet
from reportlab.platypus import SimpleDocTemplate, Paragraph, Table, TableStyle




class UserInvoicesAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        # Obtener todas las facturas del usuario actual
        user_invoices = Invoice.objects.filter(buyer__user=request.user).order_by('-created_at')
        
        serializer = InvoiceSerializer(user_invoices, many=True)

        invoices_count = len(user_invoices)

        response_data = {
            "invoices": serializer.data,
            "invoices_count": invoices_count,
        }

        # Retornar la lista de facturas en formato JSON
        return Response(response_data, status=status.HTTP_200_OK)

def send_invoice_email(invoice, user):
    subject = 'Confirmación de Compra - Orden #{}'.format(invoice.transaction_number)
    html_message = render_to_string('invoice_created_email.html', {'invoice': invoice})
    plain_message = strip_tags(html_message)
    from_email = 'tu_email@example.com'  # Reemplaza con tu dirección de correo electrónico
    to_email = user.email
    send_mail(subject, plain_message, from_email, [to_email], html_message=html_message)

class AddInvoiceAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def generate_invoice_pdf(self, invoice):
        # Crear un buffer para el PDF
        buffer = BytesIO()
        # Crear un documento PDF
        doc = SimpleDocTemplate(buffer, pagesize=letter)
        
        # Obtener estilos de muestra
        styles = getSampleStyleSheet()

        # Agregar contenido al PDF
        elements = []
        elements.append(Paragraph(f'Factura #{invoice.transaction_number}', styles['Title']))
        elements.append(Paragraph(f'Fecha de compra: {invoice.created_at.strftime("%d/%m/%Y %H:%M:%S")}', styles['Normal']))
        
        # Comprador
        elements.append(Paragraph('Comprador:', styles['Heading2']))
        elements.append(Paragraph(f'Nombre: {invoice.buyer.firs_name} {invoice.buyer.last_name}', styles['Normal']))
        elements.append(Paragraph(f'Identificación: {invoice.buyer.identification}', styles['Normal']))
        elements.append(Paragraph(f'Correo electrónico: {invoice.buyer.user.email}', styles['Normal']))
        elements.append(Paragraph(f'Teléfono: {invoice.buyer.phone}', styles['Normal']))
        elements.append(Paragraph(f'Dirección: {invoice.shipping_location.address_line_1} {invoice.shipping_location.address_line_2} {invoice.shipping_location.city.nombre}', styles['Normal']))
        elements.append(Paragraph(f'Notas: {invoice.shipping_location.delivery_notes}', styles['Normal']))
        
        # Información de entrega
        elements.append(Paragraph('Información de entrega:', styles['Heading2']))
        elements.append(Paragraph(f'Método: {invoice.shipping_method.name}', styles['Normal']))
        elements.append(Paragraph(f'Precio: ${invoice.shipping_method.price}', styles['Normal']))
        elements.append(Paragraph(f'Tiempo: {invoice.shipping_method.time_to_delivery} - dias', styles['Normal']))
        
        # Información de la tienda
        elements.append(Paragraph('Información de la Tienda:', styles['Heading2']))
        elements.append(Paragraph(f'Nombre: {invoice.store.name}', styles['Normal']))
        elements.append(Paragraph(f'Teléfono: {invoice.store.phone}', styles['Normal']))
        elements.append(Paragraph(f'Dirección: {invoice.store.address}', styles['Normal']))

        

        elements.append(Paragraph(f'Correo electrónico: {invoice.store.email}', styles['Normal']))
        
        # Productos
        product_data = [['Producto', 'Impuesto', 'Cantidad', 'Valor', 'Precio', 'Moneda']]
        for item in invoice.cart.items.all():
            product_data.append([f'{item.product_option.product.name} {item.product_option.option}',
                                 item.product_option.product.tax,
                                 item.quantity,
                                 f'${item.product_option.product.price}',
                                 f'${item.subtotal}',
                                 f"${invoice.store.city.estado_o_departamento.pais.currency.typecurrency}"])
        product_table = Table(product_data)
        product_table.setStyle(TableStyle([('BACKGROUND', (0, 0), (-1, 0), '#CCCCCC'),
                                           ('TEXTCOLOR', (0, 0), (-1, 0), '#000000'),
                                           ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
                                           ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
                                           ('BOTTOMPADDING', (0, 0), (-1, 0), 12),
                                           ('BACKGROUND', (0, 1), (-1, -1), '#FFFFFF'),
                                           ('GRID', (0, 0), (-1, -1), 1, '#CCCCCC')]))
        elements.append(Paragraph('Tus Productos:', styles['Heading2']))
        elements.append(product_table)
        
        # Total
        elements.append(Paragraph(f'Total: ${invoice.total_amount} {invoice.store.city.estado_o_departamento.pais.currency.name}', styles['Heading2']))
        
        # Mensajes
        elements.append(Paragraph('Gracias por confiar en nosotros. Esperamos que tu experiencia con FZashion sea excepcional. Te invitamos a seguir el estado de tu pedido aquí.', styles['Normal']))

        elements.append(Paragraph(f'Advertencia: Por favor, asegúrate de revisar los productos recibidos y reportar '
                                  f'cualquier problema dentro del plazo especificado en política de devolución de '
                                  f'{invoice.store.name}.', styles['Normal']))
        elements.append(Paragraph('Aviso Importante: Si en algún momento consideras que es necesario reportar incumplimientos o cualquier otra situación grave relacionada con aspectos económicos, éticos o morales en la tienda FZashion, por favor, presiona aquí para abrir un caso especial. Tu opinión es fundamental para mantener la integridad y el buen funcionamiento de nuestra plataforma. ¡Gracias por tu colaboración!', styles['Normal']))


        # Construir el PDF
        doc.build(elements)
        
        # Obtener el contenido del buffer
        pdf_data = buffer.getvalue()
        buffer.close()
        
        return pdf_data

    def post(self, request):
        serializer = CreateInvoiceSerializer(data=request.data)
        if serializer.is_valid():
            # Guarda la factura sin el campo total_amount
            invoice = serializer.save()

            # Calcula el total del carrito
            cart_id = request.data.get('cart')
            cart = get_object_or_404(Cart, id=cart_id)
            total_amount = cart.total_sin_impuestos + cart.total_impuestos
            invoice.total_amount = total_amount
            invoice.save()

            # Envía el correo electrónico
            send_invoice_email(invoice, request.user)

            # Elimina el carrito
            #cart.delete()
            # Desactiva el carrito en lugar de eliminarlo
            cart.is_active = False
            cart.save()

            # Devuelve la URL del PDF para descargar
            #pdf_url = f'/{pdf_path}'

            # Devuelve la respuesta con la URL del PDF
            return Response({'success': 'ya listo'}, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)