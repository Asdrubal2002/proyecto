# Generated by Django 4.2.10 on 2024-06-01 05:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('store', '0039_alter_store_account_pay_alter_store_url_pay'),
    ]

    operations = [
        migrations.AlterField(
            model_name='store',
            name='url_pay',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
    ]
