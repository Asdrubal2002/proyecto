from django.db import models
from django.conf import settings
import uuid
from apps.locations.models import Ciudad

User = settings.AUTH_USER_MODEL

# Create your models here.

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    firs_name = models.CharField(max_length=20, null=True)
    last_name = models.CharField(max_length=20, null=True)
    slug =  models.SlugField(max_length=255, unique=True, default=uuid.uuid4)
    phone = models.CharField(max_length=20, null=True)
    identification = models.CharField(max_length=20, null=True)


    def __str__(self):
        if self.firs_name:
            return self.firs_name
        else:
            return "UserProfile sin nombre"


class UserLocation(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    address_line_1 = models.CharField(max_length=255)
    address_line_2 = models.CharField(max_length=255, blank=True)
    city = models.ForeignKey(Ciudad, on_delete=models.CASCADE, blank=True, null=True)
    postal_zip_code = models.CharField(max_length=20)
    delivery_notes = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.postal_zip_code








