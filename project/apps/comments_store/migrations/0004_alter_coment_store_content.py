# Generated by Django 5.0 on 2024-02-24 20:19

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('comments_store', '0003_alter_coment_store_user'),
    ]

    operations = [
        migrations.AlterField(
            model_name='coment_store',
            name='content',
            field=models.TextField(validators=[django.core.validators.MaxLengthValidator(200)]),
        ),
    ]
