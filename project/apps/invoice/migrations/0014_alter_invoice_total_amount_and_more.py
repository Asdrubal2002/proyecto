# Generated by Django 4.2.10 on 2024-05-14 17:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('invoice', '0013_alter_invoice_total_amount'),
    ]

    operations = [
        migrations.AlterField(
            model_name='invoice',
            name='total_amount',
            field=models.DecimalField(blank=True, decimal_places=2, max_digits=20, null=True),
        ),
        migrations.AlterField(
            model_name='invoice',
            name='transaction_number',
            field=models.CharField(blank=True, max_length=20, null=True, unique=True),
        ),
    ]