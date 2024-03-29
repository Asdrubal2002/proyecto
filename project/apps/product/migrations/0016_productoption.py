# Generated by Django 5.0 on 2024-01-27 18:44

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('product', '0015_option'),
    ]

    operations = [
        migrations.CreateModel(
            name='ProductOption',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('option', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='product.option')),
                ('product', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='product_options', to='product.product')),
            ],
            options={
                'verbose_name': 'opción de producto',
                'verbose_name_plural': 'opciones de productos',
            },
        ),
    ]
