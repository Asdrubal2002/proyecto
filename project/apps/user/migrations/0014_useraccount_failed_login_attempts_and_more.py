# Generated by Django 4.2.10 on 2024-06-07 03:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0013_remove_useraccount_failed_login_attempts'),
    ]

    operations = [
        migrations.AddField(
            model_name='useraccount',
            name='failed_login_attempts',
            field=models.PositiveIntegerField(default=0),
        ),
        migrations.AddField(
            model_name='useraccount',
            name='last_login_attempt',
            field=models.DateTimeField(blank=True, null=True),
        ),
    ]