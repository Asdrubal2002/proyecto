from rest_framework import serializers
from .models import Coment_product
from apps.user_profile.models import UserProfile
from django.contrib.auth.models import User
from apps.user_profile.serializers import UserProfileSerializer
from django.conf import settings
from apps.product.models import Product



class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ('id','firs_name', 'last_name')

class UserPhotoSerializer(serializers.ModelSerializer):
    photo_url = serializers.SerializerMethodField()

    def get_user_photo(self, obj):
        user = obj.user
        if user and user.photo:
            request = self.context.get('request')
            return request.build_absolute_uri(user.photo.url)
        return None


class ComentProductSerializers(serializers.ModelSerializer):
    user_photo = serializers.SerializerMethodField()
    user_profile = UserProfileSerializer(source='user.userprofile', read_only=True)

    def get_user_photo(self, obj):
        user = obj.user
        if user and user.photo:
            request = self.context.get('request')
            return request.build_absolute_uri(user.photo.url)
        return None
    
    class Meta:
        model = Coment_product
        fields = ['id','product', 'content', 'created', 'user_photo','user_profile']  


class AddCommentSerializer(serializers.ModelSerializer):
    product = serializers.PrimaryKeyRelatedField(queryset=Product.objects.all())

    class Meta:
        model = Coment_product
        fields = ['product', 'user', 'content']  # Incluye el campo 'user'

    def create(self, validated_data):
        # Obtiene el usuario actual desde el contexto de la solicitud
        user = self.context['request'].user

        # Añade el usuario a los datos validados
        validated_data['user'] = user

        # Crea y devuelve una nueva instancia de Coment_product con los datos validados
        return Coment_product.objects.create(**validated_data)