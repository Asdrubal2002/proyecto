# Generated by Django 4.2.10 on 2024-04-18 21:45

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('store', '0019_store_qr_code'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='store',
            name='qr_code',
        ),
    ]
