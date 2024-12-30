from channels.generic.websocket import JsonWebsocketConsumer
from asgiref.sync import async_to_sync

from .models import Conversation, Message
from django.contrib.auth import get_user_model

User = get_user_model()


class WebChatConsumer(JsonWebsocketConsumer):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.channel_id = None
        self.user = None

    def connect(self):
        self.channel_id = self.scope["url_route"]["kwargs"]["channel_id"]
        self.server_id = self.scope["url_route"]["kwargs"]["server_id"]
        self.user = User.objects.get(pk=1)  # static user for now
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
