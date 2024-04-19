from django.db import models
from datetime import datetime
from apps.store_category.models import Category
from apps.locations.models import Ciudad
from django.conf import settings
import os
from django.utils import timezone
import uuid
User = settings.AUTH_USER_MODEL
import qrcode
from io import BytesIO

# Create your models here.

def store_directory_path_profile(instance, filename):
    profile_picture_name = 'store/{0}/profile.jpg'.format(instance.name)
    full_path = os.path.join(settings.MEDIA_ROOT, profile_picture_name)

    if os.path.exists(full_path):
        os.remove(full_path)

    return profile_picture_name

def store_directory_path_banner(instance, filename):
    profile_picture_name = 'store/{0}/banner.jpg'.format(instance.name)
    full_path = os.path.join(settings.MEDIA_ROOT, profile_picture_name)

    if os.path.exists(full_path):
        os.remove(full_path)

    return profile_picture_name

def store_directory_qr(instance, filename):
    store_name = instance.name
    store_directory = os.path.join("store", store_name)
    full_path = os.path.join(settings.MEDIA_ROOT, store_directory)

    # Crear el directorio si no existe
    os.makedirs(full_path, exist_ok=True)

    # Retornar la ruta completa del archivo
    return os.path.join(store_directory, "qr.jpg")


class Store(models.Model):
    administrator = models.OneToOneField(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=100, blank=False, null=False)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    description = models.TextField(max_length=500, blank=False)
    location = models.CharField(max_length=100, blank=True, null=True)
    address = models.CharField(max_length=100, blank=True, null=True)
    phone = models.CharField(max_length=255, blank=False)
    email = models.EmailField(max_length=255, unique=True, blank=False, null=False)
    logo = models.ImageField(default='store/store_profile.png', upload_to=store_directory_path_profile)
    banner = models.ImageField(default='store/store_banner_bg.jpg', upload_to=store_directory_path_banner)
    schedule = models.CharField(max_length=100, blank=False, null=False)
    delivery = models.BooleanField(default=False)
    nit = models.CharField(max_length=100, blank=True, null=True)
    verified = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    created_on = models.DateField(default=timezone.now)
    url_pay = models.URLField(blank=True, null=True)
    account_pay = models.CharField(max_length=20, blank=True, null=True)
    slug =  models.SlugField(max_length=255, unique=True, default=uuid.uuid4)
    # likes = models.ManyToManyField(User, blank=True, related_name='likes')
    # dislikes = models.ManyToManyField(User, blank=True, related_name='dislikes')
    likes = models.IntegerField(default=0, blank=True)
    complaints = models.IntegerField(default=0, blank=True)
    city = models.ForeignKey(Ciudad, on_delete=models.CASCADE)
    qr_code = models.ImageField(upload_to=store_directory_qr, blank=True)

    def save(self, *args, **kwargs):
        if not self.pk:  # Solo si es un objeto nuevo
            qr = qrcode.QRCode(
                version=1,
                error_correction=qrcode.constants.ERROR_CORRECT_L,
                box_size=10,
                border=4,
            )

            full_url = 'http://localhost:5173/store/' + self.slug

            qr.add_data(f'Tienda: {self.name}, Dirección: {self.address}, Teléfono: {self.phone}, URL: {full_url}')
            qr.make(fit=True)
            
            qr_img = qr.make_image(fill_color="black", back_color="white")
            temp_buffer = BytesIO()
            qr_img.save(temp_buffer, format="PNG")
            
            filename = f'qr_{self.name}.png'
            filepath = os.path.join(settings.MEDIA_ROOT, store_directory_qr(self, filename))
            
            with open(filepath, 'wb') as f:
                f.write(temp_buffer.getvalue())
            
            self.qr_code.name = store_directory_qr(self, filename)

        super().save(*args, **kwargs)

    def get_photo(self):
        if self.logo:
            return self.logo.url
        return ''
    
    def get_banner(self):
        if self.banner:
            return self.banner.url
        return ''
    
    def get_formatted_created_on(self):
        return self.created_on.strftime("%d de %B de %Y")

    def __str__(self):
        return self.name










