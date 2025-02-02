# Generated by Django 4.2.17 on 2025-01-19 18:37

from django.db import migrations, models
import django.db.models.deletion
import server.models
import server.validators


class Migration(migrations.Migration):

    dependencies = [
        ('server', '0007_alter_serverinvitation_unique_together_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='ChannelCategory',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('description', models.TextField(blank=True, null=True)),
                ('icon', models.ImageField(blank=True, null=True, upload_to=server.models.category_icon_path, validators=[server.validators.validate_image_file_extension])),
                ('server', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='channel_categories', to='server.server')),
            ],
        ),
        migrations.AddField(
            model_name='channel',
            name='category',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='channels', to='server.channelcategory'),
        ),
    ]
