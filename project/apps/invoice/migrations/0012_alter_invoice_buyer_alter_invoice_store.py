# Generated by Django 5.0 on 2024-02-22 19:14

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('invoice', '0011_alter_invoice_buyer_alter_invoice_shipping_location_and_more'),
        ('store', '0017_store_address'),
        ('user_profile', '0009_userprofile_identification'),
    ]

    operations = [
        migrations.AlterField(
            model_name='invoice',
            name='buyer',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='user_profile.userprofile'),
        ),
        migrations.AlterField(
            model_name='invoice',
            name='store',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='store.store'),
        ),
    ]
