# Generated by Django 4.2.10 on 2024-03-23 20:36

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('product', '0021_product_likes'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='product',
            name='views',
        ),
        migrations.DeleteModel(
            name='ViewCount',
        ),
    ]
