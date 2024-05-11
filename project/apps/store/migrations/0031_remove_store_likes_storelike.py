# Generated by Django 4.2.10 on 2024-05-10 02:20

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('store', '0030_remove_store_delivery'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='store',
            name='likes',
        ),
        migrations.CreateModel(
            name='StoreLike',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('liked', models.BooleanField(default=True)),
                ('created_at', models.DateTimeField(default=django.utils.timezone.now)),
                ('store', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='store.store')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'unique_together': {('user', 'store')},
            },
        ),
    ]