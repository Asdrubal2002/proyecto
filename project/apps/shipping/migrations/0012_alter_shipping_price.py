# Generated by Django 4.2.10 on 2024-05-14 17:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('shipping', '0011_alter_shipping_price'),
    ]

    operations = [
        migrations.AlterField(
            model_name='shipping',
            name='price',
            field=models.DecimalField(decimal_places=2, max_digits=20),
        ),
    ]