from rest_framework import serializers
from .models import UserProfile, UserLocation
from apps.locations.serializers import CiudadSerializer

class UserLocationSerializer(serializers.ModelSerializer):
    city=CiudadSerializer()
    class Meta:
        model = UserLocation
        fields = (
            'id',
            'user',
            'address_line_1',
            'address_line_2',
            'city',
            'postal_zip_code',
            'delivery_notes',
            'created_at',
            'updated_at'
        )
                             
class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = (
            'id',
            'user',
            'firs_name',
            'last_name',
            'phone',
            'identification'
        )
