from django.contrib.auth import get_user_model
from drf_spectacular.utils import extend_schema
from rest_framework import permissions, viewsets
from rest_framework.pagination import PageNumberPagination

from .models import Message
from .serializer import MessageSerializer
from .signals import user_has_access_to_channel

User = get_user_model()


@extend_schema(
    summary="Retrieve a list of messages",
    description="Retrieve a list of messages for a specific channel if the user has access.",
    responses={200: MessageSerializer(many=True)},
)
class MessageViewSet(viewsets.ModelViewSet):
    queryset = Message.objects.all()
    serializer_class = MessageSerializer
    permission_classes = [permissions.IsAuthenticated]
    pagination_class = PageNumberPagination

    def get_queryset(self):
        channel_id = self.request.query_params.get("channel_id")
        user = self.request.user

        signal_results = user_has_access_to_channel.send(
            self.__class__, user_id=user.id, channel_id=channel_id
        )
        user_belongs_to_channel = signal_results[0][1]

        if user_belongs_to_channel:
            return (
                Message.objects.filter(conversation__channel=channel_id)
                .order_by("-created_at")
                .all()
            )

        return Message.objects.none()
