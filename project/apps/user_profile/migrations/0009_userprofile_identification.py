# Generated by Django 5.0 on 2024-02-10 17:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user_profile', '0008_alter_userlocation_city'),
    ]

    operations = [
        migrations.AddField(
            model_name='userprofile',
            name='identification',
            field=models.CharField(max_length=20, null=True),
        ),
    ]
