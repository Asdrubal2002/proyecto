# Generated by Django 4.2.10 on 2024-05-03 18:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('product', '0035_product_tax'),
    ]

    operations = [
        migrations.AddField(
            model_name='productoption',
            name='is_active',
            field=models.BooleanField(default=False),
        ),
    ]
