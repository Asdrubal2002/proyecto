# Generated by Django 5.0 on 2024-01-27 16:11

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('product', '0007_alter_product_description'),
    ]

    operations = [
        migrations.DeleteModel(
            name='ProductOptions',
        ),
    ]
