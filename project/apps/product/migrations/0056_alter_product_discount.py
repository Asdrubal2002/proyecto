# Generated by Django 4.2.10 on 2024-06-04 01:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('product', '0055_product_discount'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='discount',
            field=models.DecimalField(blank=True, decimal_places=0, default=0, max_digits=5, null=True),
        ),
    ]