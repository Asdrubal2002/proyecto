# Generated by Django 4.2.10 on 2024-04-21 02:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('shipping', '0009_alter_shipping_price'),
    ]

    operations = [
        migrations.AlterField(
            model_name='shipping',
            name='price',
            field=models.PositiveIntegerField(blank=True, null=True),
        ),
    ]
