# Generated by Django 4.2.10 on 2024-05-14 18:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('invoice', '0016_invoice_pdf_path_alter_invoice_total_amount_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='invoice',
            name='pdf_path',
        ),
        migrations.AlterField(
            model_name='invoice',
            name='total_amount',
            field=models.DecimalField(blank=True, decimal_places=2, max_digits=20, null=True),
        ),
    ]
