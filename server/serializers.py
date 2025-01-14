from rest_framework import serializers

from .models import Channel, Server, ServerCategory


class ChannelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Channel
        fields = ["id", "name", "topic"]


class ServerSerializer(serializers.ModelSerializer):
    channels = ChannelSerializer(many=True, read_only=True)
    member_count = serializers.SerializerMethodField(method_name="get_member_count")

    class Meta:
        model = Server
        fields = [
            "id",
            "name",
            "owner",
            "category",
            "description",
            "members",
            "channels",
            "member_count",
        ]
        read_only_fields = ["owner", "members"]

    def get_member_count(self, obj):
        return obj.members.count()


class ChannelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Channel
        fields = ["id", "name", "topic", "icon", "banner"]


class ServerCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = ServerCategory
        fields = ["id", "name", "description", "icon"]
