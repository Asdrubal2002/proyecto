# Generated by Django 4.2.10 on 2024-06-07 20:20

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0020_useraccount_login_attempts'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='useraccount',
            name='login_attempts',
        ),
    ]
