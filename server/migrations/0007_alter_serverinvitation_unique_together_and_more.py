# Generated by Django 4.2.17 on 2025-01-17 16:43

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('server', '0006_serverinvitation'),
    ]

    operations = [
        migrations.AlterUniqueTogether(
            name='serverinvitation',
            unique_together=set(),
        ),
        migrations.AddField(
            model_name='serverinvitation',
            name='invitee_email',
            field=models.EmailField(default=django.utils.timezone.now, max_length=254),
            preserve_default=False,
        ),
        migrations.AlterUniqueTogether(
            name='serverinvitation',
            unique_together={('server', 'invitee_email')},
        ),
        migrations.RemoveField(
            model_name='serverinvitation',
            name='invitee',
        ),
    ]
