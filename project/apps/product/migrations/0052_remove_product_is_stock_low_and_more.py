# Generated by Django 4.2.10 on 2024-05-26 20:26

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('product', '0051_product_is_stock_low_product_low_stock_threshold'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='product',
            name='is_stock_low',
        ),
        migrations.RemoveField(
            model_name='product',
            name='low_stock_threshold',
        ),
    ]
