# Generated by Django 4.2.10 on 2024-05-26 18:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('product', '0050_alter_product_tax'),
    ]

    operations = [
        migrations.AddField(
            model_name='product',
            name='is_stock_low',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='product',
            name='low_stock_threshold',
            field=models.PositiveIntegerField(default=10),
        ),
    ]