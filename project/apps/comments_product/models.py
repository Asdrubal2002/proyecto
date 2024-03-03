from django.db import models
from django.conf import settings
from django.utils import timezone
from apps.product.models import Product
from apps.user_profile.models import UserProfile
from django.core.validators import MaxLengthValidator


User = settings.AUTH_USER_MODEL

# Create your models here.
class Coment_product(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='comentarios_product')
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    content = models.TextField(validators=[MaxLengthValidator(200)])  # Establece el máximo de 200 caracteres
    created = models.DateTimeField(default=timezone.now)
    # Otros campos para calificación, aprobado, etc.

    def __str__(self):
        return str(self.id)