from django.conf import settings
from django.db import models
from .validators import validate_icon_size, validate_image_file_extension
from django.utils.timezone import now


def channel_icon_upload_path(instance, filename):
    return f"channel/{instance.id}/icons/{filename}"


def channel_banner_upload_path(instance, filename):
    return f"channel/{instance.id}/banners/{filename}"


def category_icon_path(instance, filename):
    return f"category/{instance.id}/icons/{filename}"


class ServerCategory(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=True)
    icon = models.FileField(upload_to=category_icon_path, null=True, blank=True)

    def __str__(self):
        return self.name


class Server(models.Model):
    name = models.CharField(max_length=100)
    owner = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="servers"
    )
    category = models.ForeignKey(
        ServerCategory, on_delete=models.CASCADE, related_name="servers"
    )
    description = models.TextField(max_length=250, null=True)
    members = models.ManyToManyField(
        settings.AUTH_USER_MODEL, related_name="server_members", blank=True
    )

    def __str__(self):
        return self.name


class Channel(models.Model):
    name = models.CharField(max_length=100)
    server = models.ForeignKey(
        Server, on_delete=models.CASCADE, related_name="channels"
    )
    owner = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="channels"
    )
    topic = models.TextField(max_length=100, null=True)
    banner = models.ImageField(
        upload_to=channel_banner_upload_path,
        null=True,
        blank=True,
        validators=[validate_image_file_extension],
    )
    icon = models.ImageField(
        upload_to=channel_icon_upload_path,
        null=True,
        blank=True,
        validators=[validate_icon_size, validate_image_file_extension],
    )

    def save(self, *args, **kwargs):
        self.name = self.name.lower()
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name


class ServerInvitation(models.Model):
    STATUS_CHOICES = [
        ("pending", "Pending"),
        ("seen", "Seen"),
        ("accepted", "Accepted"),
        ("declined", "Declined"),
        ("expired", "Expired"),
    ]

    server = models.ForeignKey(
        "Server", on_delete=models.CASCADE, related_name="invitations"
    )
    inviter = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="sent_invitations",
    )
    invitee_email = models.EmailField(null=False, blank=False)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default="pending")
    created_at = models.DateTimeField(default=now)
    updated_at = models.DateTimeField(auto_now=True)
    expires_at = models.DateTimeField(null=True, blank=True)

    def is_expired(self):
        return self.expires_at and now() > self.expires_at

    def __str__(self):
        return f"Invitation from {self.inviter} to {self.invitee} for {self.server}"

    class Meta:
        unique_together = (
            "server",
            "invitee_email",
        )
