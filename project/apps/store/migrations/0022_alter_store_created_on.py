# Generated by Django 4.2.10 on 2024-04-19 04:30

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('store', '0021_store_qr_code'),
    ]

    operations = [
        migrations.AlterField(
            model_name='store',
            name='created_on',
            field=models.DateField(default=django.utils.timezone.now),
        ),
    ]
