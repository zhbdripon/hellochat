# Generated by Django 4.2.17 on 2025-01-11 11:11

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('server', '0003_channel_banner_channel_icon'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='Category',
            new_name='ServerCategory',
        ),
    ]