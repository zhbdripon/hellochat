from django.utils.timezone import now
from rest_framework import serializers
from datetime import timedelta

from .models import Channel, Server, ServerCategory, ServerInvitation


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


class ServerInvitationSerializer(serializers.ModelSerializer):
    server_name = serializers.ReadOnlyField(source="server.name")
    inviter_username = serializers.ReadOnlyField(source="inviter.username")
    invitee_username = serializers.ReadOnlyField(source="invitee.username")
    is_expired = serializers.SerializerMethodField()

    class Meta:
        model = ServerInvitation
        fields = [
            "id",
            "server",
            "server_name",
            "inviter",
            "inviter_username",
            "invitee",
            "invitee_username",
            "status",
            "created_at",
            "updated_at",
            "expires_at",
            "is_expired",
        ]
        read_only_fields = [
            "id",
            "created_at",
            "updated_at",
            "is_expired",
            "status",
            "expires_at",
        ]

    def create(self, validated_data):
        validated_data["status"] = "pending"
        validated_data["expires_at"] = now() + timedelta(days=365)
        return super().create(validated_data)

    def get_is_expired(self, obj):
        return obj.is_expired()

    def validate(self, data):
        """Custom validation for server invitations."""

        if data["inviter"] == data["invitee"]:
            raise serializers.ValidationError("You cannot invite yourself to a server.")

        if "expires_at" in data and data["expires_at"] and data["expires_at"] <= now():
            raise serializers.ValidationError("Expiration date must be in the future.")

        return data


class ServerNonMemberSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    username = serializers.CharField()
    email = serializers.EmailField()
