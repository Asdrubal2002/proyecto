from django.db import models
from apps.product.models import Product
from apps.store.models import Store

from django.conf import settings
User = settings.AUTH_USER_MODEL

# Create your models here.


class WishList(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)

class WishListStore(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    store = models.ForeignKey(Store, on_delete=models.CASCADE)
