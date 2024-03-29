# Generated by Django 5.0 on 2024-01-25 21:00

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('locations', '0003_pais_currency'),
        ('user_profile', '0005_alter_userlocation_city'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userlocation',
            name='city',
            field=models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='locations.ciudad'),
        ),
    ]
