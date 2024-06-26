# Generated by Django 4.2.10 on 2024-04-29 00:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('product', '0027_alter_product_price_alter_product_tax'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='price',
            field=models.CharField(help_text='Use el punto para indicar los decimales', max_length=20),
        ),
        migrations.AlterField(
            model_name='product',
            name='tax',
            field=models.CharField(blank=True, default=0, help_text='Use el punto para indicar los decimales', max_length=20),
        ),
    ]
