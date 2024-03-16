from django.db import models
from apps.store.models import Store

# Create your models here.

# Create your models here.

class Category(models.Model):
    class Meta:
        verbose_name = 'Category'
        verbose_name_plural = 'Categories'
    
    parent = models.ForeignKey('self', related_name='children', on_delete=models.CASCADE, blank=True, null=True)
    name = models.CharField(max_length=255)
    store = models.ForeignKey(Store, on_delete=models.CASCADE, related_name='categories_store')
    slug =  models.SlugField(max_length=255)
    is_active = models.BooleanField(default=True)



    def __str__(self):
        return self.name
    

