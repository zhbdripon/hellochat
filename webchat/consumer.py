from channels.generic.websocket import JsonWebsocketConsumer
from asgiref.sync import async_to_sync

from .models import Conversation, Message
from django.contrib.auth import get_user_model

from .signals import user_belongs_to_server

User = get_user_model()


class WebChatConsumer(JsonWebsocketConsumer):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.channel_id = None
        self.user = None

    def connect(self):
        self.channel_id = self.scope["url_route"]["kwargs"]["channel_id"]
        self.server_id = self.scope["url_route"]["kwargs"]["server_id"]
        self.user = self.scope["user"]

        if not self.user or not self.user.is_authenticated:
            self.close()
            return

        server_user_result = user_belongs_to_server.send(
            sender=self.__class__, user=self.user, server_id=self.server_id)
        user_is_member = server_user_result and server_user_result[0][1]

        if not user_is_member:
            self.close()
            return

        self.accept()
        async_to_sync(self.channel_layer.group_add)(
            self.channel_id, self.channel_name)

    def receive(self, text_data):
        conversation, created = Conversation.objects.get_or_create(
            channel=self.channel_id)
        message = Message.objects.create(
            conversation=conversation, content=text_data, author=self.user
        )

        async_to_sync(self.channel_layer.group_send)(
            self.channel_id,
            {
                "type": "chat_message",
                "message": {
                    "content": message.content,
                    "id": message.id,
                    "author": self.user.username,
                    "timestamp": message.created_at.isoformat(),
                },
            },
        )

    def chat_message(self, event):
        self.send_json(event)

    def disconnect(self, close_code):
        async_to_sync(self.channel_layer.group_discard)(
            self.channel_id, self.channel_name)
        super().disconnect(close_code)
