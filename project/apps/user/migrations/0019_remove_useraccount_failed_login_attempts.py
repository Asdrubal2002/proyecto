# Generated by Django 4.2.10 on 2024-06-07 03:49

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0018_useraccount_failed_login_attempts'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='useraccount',
            name='failed_login_attempts',
        ),
    ]
