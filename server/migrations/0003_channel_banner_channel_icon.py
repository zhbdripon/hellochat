# Generated by Django 4.2.17 on 2024-12-28 20:37

from django.db import migrations, models
import server.models
import server.validators


class Migration(migrations.Migration):

    dependencies = [
        ('server', '0002_category_icon'),
    ]

    operations = [
        migrations.AddField(
            model_name='channel',
            name='banner',
            field=models.ImageField(blank=True, null=True, upload_to=server.models.channel_banner_upload_path, validators=[server.validators.validate_image_file_extension]),
        ),
        migrations.AddField(
            model_name='channel',
            name='icon',
            field=models.ImageField(blank=True, null=True, upload_to=server.models.channel_icon_upload_path, validators=[server.validators.validate_icon_size, server.validators.validate_image_file_extension]),
        ),
    ]
