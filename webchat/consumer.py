from channels.generic.websocket import JsonWebsocketConsumer
from asgiref.sync import async_to_sync
from django.contrib.auth import get_user_model

from .models import Conversation, Message
from .signals import user_belongs_to_server

User = get_user_model()


class WebChatConsumer(JsonWebsocketConsumer):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.user = None
        self.joined_groups = set()

    def connect(self):
        self.user = self.scope["user"]

        if not self.user or not self.user.is_authenticated:
            self.close()
            return

        self.accept()

    def get_server_group_name(self, server_id):
        return f"chatroom_{server_id}"

    def user_has_server_access(self, server_id):
        server_user_result = user_belongs_to_server.send(
            sender=self.__class__, user=self.user, server_id=server_id
        )

        return server_user_result and server_user_result[0][1]

    def add_to_server_group(self, data):
        server_id = data.get("server_id")
        server_name = self.get_server_group_name(server_id)

        if server_name in self.joined_groups:
            return

        if not self.user_has_server_access(server_id):
            self.close()
            return

        async_to_sync(self.channel_layer.group_add)(server_name, self.channel_name)
        self.joined_groups.add(server_name)

    def send_group_message(self, data):
        channel_id = data.get("channel_id")
        server_id = data.get("server_id")
        message = data.get("message")
        server_name = self.get_server_group_name(server_id)

        if server_name not in self.joined_groups:
            self.add_to_server_group(data)

        if not self.user_has_server_access(server_id):
            self.close()
            return

        conversation, created = Conversation.objects.get_or_create(channel=channel_id)
        message = Message.objects.create(
            conversation=conversation, content=message, author=self.user
        )

        async_to_sync(self.channel_layer.group_send)(
            server_name,
            {
                "type": "group_message",
                "message": {
                    "content": message.content,
                    "id": message.id,
                    "author": self.user.username,
                    "timestamp": message.created_at.isoformat(),
                    "conversation": conversation.id,
                },
            },
        )

    def receive(self, text_data):
        import json

        data = json.loads(text_data)
        type = data.get("type")

        if type == "server_join":
            self.add_to_server_group(data)
        elif type == "server_message":
            self.send_group_message(data)

    def group_message(self, event):
        self.send_json(event)

    def disconnect(self, close_code):
        for group_name in self.joined_groups:
            async_to_sync(self.channel_layer.group_discard)(
                group_name, self.channel_name
            )
        super().disconnect(close_code)
