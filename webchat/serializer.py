from rest_framework import serializers
from .models import Message


class MessageSerializer(serializers.ModelSerializer):
    author = serializers.StringRelatedField()

    class Meta:
        model = Message
        fields = ["id", "content", "author", "conversation", "created_at"]
