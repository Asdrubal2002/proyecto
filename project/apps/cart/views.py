from django.shortcuts import render, get_object_or_404
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated

from .models import Cart, ItemCarrito
from apps.product.models import Product, ProductOption, Option
from apps.product.serializer import ProductSerializer
from .serializer import ItemCarritoSerializer, CartSerializer

from django.db import transaction
from django.core.exceptions import PermissionDenied
from rest_framework.views import APIView
from django.db.models import F
from apps.store.models import Store


# Create your views here.


class view_user_carts(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        user = request.user
        carts = Cart.objects.filter(user=user, is_active=True)

        serializer = CartSerializer(carts, many=True)

        # Devuelve la respuesta con la información y el conteo
        response_data = {
            "carts": serializer.data,
        }

        return Response(response_data, status=status.HTTP_200_OK)

class count_user_carts(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        user = request.user
        carts = Cart.objects.filter(user=user, is_active=True)
        
        # Obtén el conteo de carros para el usuario
        cart_count = len(carts)

        # Devuelve la respuesta con la información y el conteo
        response_data = {
            "cart_count": cart_count,
        }

        return Response(response_data, status=status.HTTP_200_OK)

def crear_item_carrito(product_option_id, user, cart):
    try:
        # Obtener la instancia de ProductOption
        product_option = ProductOption.objects.select_for_update().get(id=product_option_id)

        # Verificar si la cantidad disponible es mayor que cero
        if product_option.quantity > 0:
            # Disminuir la cantidad disponible en 1 y aumentar la cantidad vendida en 1
            product_option.quantity -= 1
            product_option.sold += 1
            product_option.save()

            # Verificar y actualizar el estado de stock bajo de la opción del producto
            product_option.check_stock_level()

            # Crear o actualizar el objeto ItemCarrito
            item_carrito, created = ItemCarrito.objects.get_or_create(product_option=product_option, cart=cart)
            if not created:
                item_carrito.quantity += 1
                item_carrito.save()

            return item_carrito, created

        else:
            return None, False

    except ProductOption.DoesNotExist:
        return None, False

class AddToCart(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        user = request.user
        product_option_id = request.data.get('product_option_id')

        if not product_option_id:
            return Response({'error': 'El parámetro product_option_id es obligatorio'}, status=status.HTTP_400_BAD_REQUEST)

        # Validar la cantidad disponible antes de crear el ítem y el carrito
        product_option = ProductOption.objects.filter(id=product_option_id, quantity__gt=0).first()
        if not product_option:
            return Response({'error': 'La cantidad del ítem seleccionado es 0. No se pudo agregar al carrito.'}, status=status.HTTP_400_BAD_REQUEST)

        # Verificar si el usuario tiene un carrito activo para la tienda del producto
        store = product_option.product.category.store
        cart = Cart.objects.filter(user=user, store=store, is_active=True).first()

        if cart:
            # El usuario tiene un carrito activo, procedemos como antes
            item_carrito, created = crear_item_carrito(product_option_id, user, cart)
        else:
            # El usuario no tiene un carrito activo, creamos uno nuevo
            cart = Cart.objects.create(user=user, store=store, is_active=True)
            item_carrito, created = crear_item_carrito(product_option_id, user, cart)

        if created:
            # Actualizar estado de stock bajo en el producto si es necesario
            product_option.product.check_stock_level()  # Llamar a la función para actualizar el estado de stock bajo

            return Response({'message': 'El ítem fue agregado al carrito correctamente'}, status=status.HTTP_201_CREATED)
        else:
            if item_carrito is None:
                return Response({'error': 'Hubo un problema al agregar el ítem al carrito'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            else:
                return Response({'message': 'La cantidad del ítem en el carrito fue actualizada correctamente'}, status=status.HTTP_200_OK)
            
class ProductsCartView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, cart_slug):
        user = request.user
        print(cart_slug)

        try:
            # Busca el carrito asociado al usuario con el identificador dado
            cart = Cart.objects.get(slug=cart_slug, user=user)

            # Serializa y devuelve el carrito
            cart_serializer = CartSerializer(cart)
            return Response(cart_serializer.data, status=status.HTTP_200_OK)
        except Cart.DoesNotExist:
            return Response(
                {"error": "Carrito no encontrado"}, status=status.HTTP_404_NOT_FOUND
            )

class IncrementItemQuantity(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request, *args, **kwargs):
        user = request.user
        item_id = request.data.get("item_id")

        if not item_id:
            return Response(
                {"error": "El parámetro item_id es obligatorio"}, status=400
            )

        try:
            # Obtén el item del carrito
            item = ItemCarrito.objects.get(id=item_id, cart__user=user)

            # Verifica si la cantidad disponible del producto es mayor a 0
            if item.product_option.quantity > 0:
                # Incrementa la cantidad del item
                item.quantity += 1
                item.save()

                # Disminuye la cantidad disponible del producto
                item.product_option.quantity -= 1
                item.product_option.save()

                # Aumenta la cantidad vendida del producto
                item.product_option.sold += 1
                item.product_option.save()

                # Llama al método para validar la situación de la cantidad del stock de la opción
                item.product_option.check_stock_level()

                # Actualiza y devuelve el item actualizado
                item_serializer = ItemCarritoSerializer(item)
                return Response({'cart': item_serializer.data}, status=status.HTTP_200_OK)
            else:
                return Response(
                    {"error": "No hay más productos disponibles"},
                    status=status.HTTP_400_BAD_REQUEST,
                )

        except ItemCarrito.DoesNotExist:
            return Response(
                {"error": "Item de carrito no encontrado"},
                status=status.HTTP_404_NOT_FOUND,
            )

class DecrementItemQuantity(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request, *args, **kwargs):
        user = request.user
        item_id = request.data.get("item_id")

        if not item_id:
            return Response(
                {"error": "El parámetro item_id es obligatorio"}, status=400
            )

        try:
            # Obtén el ítem del carrito
            item = ItemCarrito.objects.get(id=item_id, cart__user=user)

            # Verifica si la cantidad del ítem es mayor a 1 antes de decrementar
            if item.quantity > 1:
                # Decrementa la cantidad del ítem en el carrito
                item.quantity -= 1
                item.save()

                # Incrementa la cantidad disponible del producto
                item.product_option.quantity += 1
                item.product_option.save()

                # Decrementa la cantidad vendida del producto
                item.product_option.sold -= 1
                item.product_option.save()

                # Llama al método para validar la situación de la cantidad del stock de la opción
                item.product_option.check_stock_level()

                # Actualiza y devuelve el ítem actualizado
                item_serializer = ItemCarritoSerializer(item)
                return Response({'cart': item_serializer.data}, status=status.HTTP_200_OK)
            else:
                return Response(
                    {"error": "La cantidad mínima es 1 para este producto"},
                    status=status.HTTP_400_BAD_REQUEST,
                )

        except ItemCarrito.DoesNotExist:
            return Response(
                {"error": "Ítem de carrito no encontrado"},
                status=status.HTTP_404_NOT_FOUND,
            )

class RemoveItemFromCart(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, format=None):
        user = request.user
        item_id = request.data.get("item_id")

        if not item_id:
            return Response(
                {"error": "El parámetro item_id es obligatorio"}, status=400
            )

        try:
            # Obtén el ítem del carrito
            item = ItemCarrito.objects.get(id=item_id, cart__user=user)

            # Guarda la cantidad del ítem antes de eliminarlo
            cantidad_eliminada = item.quantity

            # Elimina el ítem del carrito
            item.delete()

            # Incrementa la cantidad disponible del producto
            item.product_option.quantity += cantidad_eliminada
            item.product_option.save()

            # Decrementa la cantidad vendida del producto
            item.product_option.sold -= cantidad_eliminada
            item.product_option.save()

            # Llama al método para validar la situación de la cantidad del stock de la opción
            item.product_option.check_stock_level()

            # Verifica si el carrito está vacío después de eliminar el ítem
            cart = item.cart
            if not cart.items.exists():
                # Si el carrito está vacío, elimínalo
                cart.delete()

            return Response(
                {"message": "Producto eliminado del carrito exitosamente"},
                status=status.HTTP_204_NO_CONTENT,
            )

        except ItemCarrito.DoesNotExist:
            return Response(
                {"error": "Ítem de carrito no encontrado"},
                status=status.HTTP_404_NOT_FOUND,
            )

class RemoveCartBySlug(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, format=None):
        user = request.user
        slug = request.data.get("cart_slug")

        if not slug:
            return Response(
                {
                    "error": "El parámetro cart_slug es obligatorio en el cuerpo de la solicitud"
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:
            # Obtén el carrito por su slug
            cart = get_object_or_404(Cart, slug=slug, user=user)

            # Itera sobre todos los elementos del carrito
            for item in cart.items.all():
                # Devuelve la cantidad de productos al inventario
                item.product_option.quantity += item.quantity
                item.product_option.save()

                # Actualiza el contador de productos vendidos
                item.product_option.sold -= item.quantity
                item.product_option.save()

                # Llama al método para validar la situación de la cantidad del stock de la opción
                item.product_option.check_stock_level()

            # Elimina el carrito
            cart.delete()

            return Response(
                {"message": "Carrito eliminado exitosamente"},
                status=status.HTTP_204_NO_CONTENT,
            )

        except Cart.DoesNotExist:
            return Response(
                {"error": "Carrito no encontrado"}, status=status.HTTP_404_NOT_FOUND
            )

class SynchCartView(APIView):
    def put(self, request, format=None):
        user = self.request.user
        data = self.request.data

        # Diccionario para rastrear cambios
        changes = {
            "updated_items": [],
            "added_items": [],
            "deleted_items": [],
        }

        try:
            cart_items = data["cart_items"]

            for cart_item in cart_items:
                cart = Cart.objects.get(user=user)

                try:
                    product_id = int(cart_item["product_id"])
                except:
                    return Response(
                        {"error": "Product ID must be an integer"},
                        status=status.HTTP_404_NOT_FOUND,
                    )

                if not Product.objects.filter(id=product_id).exists():
                    return Response(
                        {"error": "Product with this ID does not exist"},
                        status=status.HTTP_404_NOT_FOUND,
                    )

                product = Product.objects.get(id=product_id)

                # Verificar si el elemento ya existe en el carrito
                if ItemCarrito.objects.filter(cart=cart, product=product).exists():
                    item = ItemCarrito.objects.get(cart=cart, product=product)

                    # Actualizar el item existente (ejemplo)
                    item.count = cart_item["count"]
                    item.save()

                    # Registrar en updated_items
                    changes["updated_items"].append(
                        {
                            "product_id": product_id,
                            "count": item.count,
                        }
                    )
                else:
                    # El elemento no existe, agregarlo al carrito
                    try:
                        cart_item_count = int(cart_item["count"])
                    except:
                        cart_item_count = 1

                    # Asegurarse de que la cantidad sea válida
                    if cart_item_count > 0:
                        ItemCarrito.objects.create(
                            product=product, cart=cart, count=cart_item_count
                        )

                        # Registrar en added_items
                        changes["added_items"].append(
                            {
                                "product_id": product_id,
                                "count": cart_item_count,
                            }
                        )

                        if ItemCarrito.objects.filter(
                            cart=cart, product=product
                        ).exists():
                            # Sumar item
                            total_items = int(cart.total_items) + 1
                            Cart.objects.filter(user=user).update(
                                total_items=total_items
                            )

            return Response(
                {"success": "Cart Synchronized", "changes": changes},
                status=status.HTTP_201_CREATED,
            )
        except:
            return Response(
                {"error": "Something went wrong when synching cart"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )

class ProductsCartViewStore(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, store_slug):
        user = request.user

        try:
            # Busca la tienda con el slug dado
            store = Store.objects.get(slug=store_slug)
        except Store.DoesNotExist:
            return Response(
                {"error": "Tienda no encontrada"}, status=status.HTTP_404_NOT_FOUND
            )

        try:
            # Busca el carrito asociado al usuario y a la tienda
            cart = Cart.objects.get(user=user, store=store, is_active=True)

            # Serializa y devuelve el carrito
            cart_serializer = CartSerializer(cart)
            return Response(cart_serializer.data, status=status.HTTP_200_OK)
        except Cart.DoesNotExist:
            return Response(
                {"error": "Carrito no encontrado"}, status=status.HTTP_404_NOT_FOUND
            )