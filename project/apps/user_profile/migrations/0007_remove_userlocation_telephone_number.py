# Generated by Django 5.0 on 2024-02-01 17:46

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('user_profile', '0006_alter_userlocation_city'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='userlocation',
            name='telephone_number',
        ),
    ]
