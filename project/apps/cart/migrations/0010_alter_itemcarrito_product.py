# Generated by Django 5.0 on 2024-01-28 19:48

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cart', '0009_alter_itemcarrito_product'),
        ('product', '0017_productoption_quantity'),
    ]

    operations = [
        migrations.AlterField(
            model_name='itemcarrito',
            name='product',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='product.product'),
        ),
    ]
