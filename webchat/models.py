from django.db import models
from django.contrib.auth import get_user_model

# Create your models here.


class Conversation(models.Model):
    channel = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)


class Message(models.Model):
    conversation = models.ForeignKey(
        Conversation, on_delete=models.CASCADE, related_name='messages')
    content = models.TextField()
    author = models.ForeignKey(
        get_user_model(), on_delete=models.CASCADE)  # noqa
    created_at = models.DateTimeField(auto_now_add=True)
