from rest_framework import serializers
from .models import Message


class MessageSerializer(serializers.ModelSerializer):
    author = serializers.StringRelatedField()
    channel_id = serializers.SerializerMethodField()

    class Meta:
        model = Message
        fields = ["id", "content", "author", "channel_id", "created_at", "conversation"]

    def get_channel_id(self, obj):
        return obj.conversation.channel
