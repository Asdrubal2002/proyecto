# Generated by Django 5.0 on 2024-01-18 18:57

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('currency', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='currency',
            old_name='typeCurrency',
            new_name='typecurrency',
        ),
    ]
