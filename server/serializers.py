from rest_framework import serializers
from .models import Server, Channel


class ChannelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Channel
        fields = ['id', 'name', 'topic']


class ServerSerializer(serializers.ModelSerializer):
    channels = ChannelSerializer(many=True, read_only=True)
    member_count = serializers.SerializerMethodField(
        method_name='get_member_count')

    class Meta:
        model = Server
        fields = ['id', 'name', 'owner', 'category',
                  'description', 'members', 'channels', 'member_count']

    def get_member_count(self, obj):
        return obj.members.count()
