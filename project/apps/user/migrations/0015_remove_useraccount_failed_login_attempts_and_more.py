# Generated by Django 4.2.10 on 2024-06-07 03:13

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0014_useraccount_failed_login_attempts_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='useraccount',
            name='failed_login_attempts',
        ),
        migrations.RemoveField(
            model_name='useraccount',
            name='last_login_attempt',
        ),
    ]
