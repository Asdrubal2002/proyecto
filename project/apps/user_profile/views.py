from django.shortcuts import render

# Create your views here.
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import UserProfile, UserLocation
from .serializers import UserProfileSerializer, UserLocationSerializer
from rest_framework.permissions import IsAuthenticated


class GetUserProfileView(APIView):
    def get(self, request, format=None):
        try:
            user = self.request.user
            user_profile = UserProfile.objects.get(user=user)
            user_profile = UserProfileSerializer(user_profile)

            return Response(
                {'profile': user_profile.data},
                status=status.HTTP_200_OK
            )
        except:
            return Response(
                {'error': 'Something went wrong when retrieving profile'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

class UpdateUserProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request, format=None):
        try:
            user = self.request.user
            data = self.request.data

            firs_name = data['firs_name']
            last_name = data['last_name']
            phone = data['phone']
            identification = data['identification']
            
           
            UserProfile.objects.filter(user=user).update(
                firs_name=firs_name,
                last_name=last_name,
                phone=phone,
                identification=identification
            )

            user_profile = UserProfile.objects.get(user=user)
            user_profile = UserProfileSerializer(user_profile)

            return Response(
                {'profile': user_profile.data},
                status=status.HTTP_200_OK
            )
        except:
            return Response(
                {'error': 'Something went wrong when updating profile'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
        
class GetUserProfileLocationView(APIView):
    def get(self, request, format=None):
        try:
            user = request.user  # Obtener el usuario autenticado
            user_location = UserLocation.objects.get(user=user)  # Obtener la ubicación del usuario
            user_location_serializer = UserLocationSerializer(user_location)
            return Response(
                {'profile_location': user_location_serializer.data},
                status=status.HTTP_200_OK
            )
        except UserLocation.DoesNotExist:
            return Response(
                {'error': 'La ubicación del usuario no existe'},
                status=status.HTTP_404_NOT_FOUND
            )
        except Exception as e:
            return Response(
                {'error': str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

class UpdateUserLocationView(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request, format=None):
        try:
            user = self.request.user
            print(user)
            data = self.request.data

            print(data)
        
            address_line_1 = data.get('address_line_1', '')
            address_line_2 = data.get('address_line_2', '')
            city = data.get('city', None)
            postal_zip_code = data.get('postal_zip_code', '')
            delivery_notes = data.get('delivery_notes', '')

            UserLocation.objects.filter(user=user).update(
                address_line_1=address_line_1,
                address_line_2=address_line_2,
                city=city,
                postal_zip_code=postal_zip_code,
                delivery_notes=delivery_notes
            )

            user_location = UserLocation.objects.get(user=user)
            user_location = UserLocationSerializer(user_location)
            

            return Response(
                {'profile_location': user_location.data},
                status=status.HTTP_200_OK
            )

        except:
            return Response(
                {'error': 'Something went wrong when updating profile'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )               