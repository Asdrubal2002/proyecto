from rest_framework import serializers
from .models import Store, StorePolicy, StoreLike
from apps.store_category.serializers import CategorySerializer
from apps.locations.serializers import CiudadSerializer


class StoreSerializer(serializers.ModelSerializer):
    category = CategorySerializer()
    city = CiudadSerializer()

    class Meta:
        model = Store
        fields = [
            "id",
            "administrator",
            "name",
            "category",
            "description",
            "location",
            "address",
            "phone",
            "email",
            "logo",
            "banner",
            "schedule",
            "nit",
            "verified",
            "is_active",
            "created_on",
            "url_pay",
            "account_pay",
            "slug",
            "complaints",
            "city",
            "get_formatted_created_on",
            "qr_code",
            "instagram",
            "facebook",
            "x_red_social",
        ]


class CreateStoreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Store

        exclude = [
            "is_active",
            "complaints",
            "verified",
            "created_on",
            "logo",
            "banner",
        ]


class StorePolicySerializer(serializers.ModelSerializer):
    class Meta:
        model = StorePolicy
        fields = "name", "policy_text"

class WishListStoreSerializer(serializers.ModelSerializer):
    store = StoreSerializer()
    class Meta:
        model = StoreLike
        fields = ['store',]