from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
import os

from django.conf import settings

from apps.user_profile.models import UserProfile, UserLocation


# Create your models here.

# Metodo para guardar en la carpeta correspondiente dentro de Media users/correo/photo de perfil
def user_directory_path_profile(instance, filename):
    profile_picture_name = 'users/{0}/profile.jpg'.format(instance.email)
    full_path = os.path.join(settings.MEDIA_ROOT, profile_picture_name)

    if os.path.exists(full_path):
        os.remove(full_path)

    return profile_picture_name

class UserAccountManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('El usuario debe tener un correo electronico')
        
        
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)

        user.set_password(password)
        user.save()

        profile = UserProfile.objects.create(user=user)
        profile.save()

        location = UserLocation.objects.create(user=user)
        location.save()

        return user
    
    def create_superuser(self, email, password, **extra_fields):
        user = self.create_user(email, password, **extra_fields)

        user.is_superuser = True
        user.is_staff = True
        user.save()

        return user
    
class UserAccount(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(max_length=255, unique=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_seller = models.BooleanField(default=False)  # Nuevo campo para identificar si el usuario es vendedor
    photo = models.ImageField(upload_to=user_directory_path_profile, blank=True)
    is_primary_store_admin = models.BooleanField(default=False)
    failed_login_attempts = models.IntegerField(default=0)  # Nuevo campo para contar los intentos de inicio de sesión fallidos


    objects = UserAccountManager()

    USERNAME_FIELD = 'email'

    def get_first_letters(self):
        initials=self.email[0:1].upper()
        return initials
        
    def __str__(self):
        return self.email
    
    @property
    def profile(self):
        return UserProfile.objects.get(user=self)

    @property
    def location(self):
        return UserLocation.objects.get(user=self)



    




