# Generated by Django 4.2.10 on 2024-05-23 02:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('store', '0035_alter_store_address'),
    ]

    operations = [
        migrations.AlterField(
            model_name='storepolicy',
            name='policy_text',
            field=models.TextField(max_length=5000),
        ),
    ]
