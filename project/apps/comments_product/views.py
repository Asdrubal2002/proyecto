from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Coment_product
from .serializers import ComentProductSerializers, AddCommentSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from django.shortcuts import get_object_or_404
from rest_framework.request import Request
from rest_framework import generics


# Create your views here.


class ComentProductAPIView(APIView):
    def get(self, request, product_slug):
        # Obtener comentarios para la tienda específica y ordenarlos por fecha reciente
        comentarios = Coment_product.objects.filter(
            product__slugProduct=product_slug
        ).order_by("-created")

        # Serializar los comentarios con el contexto de la solicitud
        serializer = ComentProductSerializers(
            comentarios, many=True, context={"request": request}
        )

        comments_count = len(comentarios)

        response_data = {
            "comments": serializer.data,
            "comments_count": comments_count,
        }

        return Response(response_data, status=status.HTTP_200_OK)


class AddCommentProductView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request: Request, format=None):
        try:
            # Obtiene el usuario actual
            user = request.user

            # Obtiene los datos del request
            data = request.data

            # Añade el usuario actual a los datos del comentario
            data["user"] = user.id

            # Serializa los datos del comentario
            serializer = AddCommentSerializer(data=data, context={"request": request})

            # Valida y guarda el comentario si los datos son válidos
            if serializer.is_valid():
                serializer.save()

                product_slug = data.get("product")
                comentarios = Coment_product.objects.filter(
                    product__id=product_slug
                ).order_by("-created")
                comment_serializer = ComentProductSerializers(
                    comentarios, many=True, context={"request": request}
                )

                comments_count = len(comentarios)

                response_data = {
                    "comments": comment_serializer.data,
                    "comments_count": comments_count,
                    "comment": serializer.data,
                }

                return Response(
                    response_data,
                    status=status.HTTP_201_CREATED,
                )
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        except Exception as e:
            return Response(
                {"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


class ComentDeleteAPIView(generics.DestroyAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Coment_product.objects.all()
    serializer_class = ComentProductSerializers

    def delete(self, request, *args, **kwargs):
        try:
            comentario = self.get_object()
        except Coment_product.DoesNotExist:
            return Response(
                {"message": "El comentario no existe."},
                status=status.HTTP_404_NOT_FOUND,
            )

        if comentario.user != request.user:
            return Response(
                {"message": "No tienes permiso para eliminar este comentario."},
                status=status.HTTP_403_FORBIDDEN,
            )

        product_slug = comentario.product.slugProduct
        comentario.delete()

        # Obtener todos los demás comentarios para la tienda específica
        comentarios = Coment_product.objects.filter(
            product__slugProduct=product_slug
        ).order_by("-created")
        serializer = self.get_serializer(comentarios, many=True)

        comments_count = len(comentarios)

        response_data = {
            "comments": serializer.data,
            "comments_count": comments_count,
        }

        return Response(
            response_data,
            status=status.HTTP_200_OK,
        )


class ComentUpdateAPIView(generics.UpdateAPIView):
    queryset = Coment_product.objects.all()
    serializer_class = ComentProductSerializers
    permission_classes = [IsAuthenticated]

    def patch(self, request, *args, **kwargs):
        # Obtiene el comentario a editar
        comentario = self.get_object()

        # Verifica si el usuario tiene permiso para editar el comentario
        if comentario.user != request.user:
            return Response(
                {"message": "No tienes permiso para editar este comentario."},
                status=status.HTTP_403_FORBIDDEN,
            )

        # Serializa el comentario con los datos proporcionados en la solicitud
        serializer = self.get_serializer(comentario, data=request.data, partial=True)

        # Valida y guarda los datos actualizados del comentario
        if serializer.is_valid():
            serializer.save()

            # Filtra los comentarios asociados al producto del comentario actualizado
            comentarios = Coment_product.objects.filter(
                product=comentario.product
            ).order_by("-created")

            # Serializa los comentarios filtrados
            comentarios_serializer = self.get_serializer(comentarios, many=True)

            comments_count = len(comentarios)

            response_data = {
                "comments": comentarios_serializer.data,
                "comments_count": comments_count,
            }

            return Response(
                response_data,
                status=status.HTTP_200_OK,
            )
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
