# Generated by Django 5.0.7 on 2024-09-03 09:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('pickup', '0004_alter_pickuprequest_pickup_date'),
    ]

    operations = [
        migrations.AddField(
            model_name='pickuprequest',
            name='latitude',
            field=models.DecimalField(blank=True, decimal_places=6, max_digits=9, null=True),
        ),
        migrations.AddField(
            model_name='pickuprequest',
            name='longitude',
            field=models.DecimalField(blank=True, decimal_places=6, max_digits=9, null=True),
        ),
    ]
