# Generated by Django 5.0 on 2024-01-27 17:43

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('product', '0012_remove_product_quantity_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='product',
            old_name='total_quantity_available',
            new_name='quantity',
        ),
    ]
