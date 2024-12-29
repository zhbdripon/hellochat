from channels.generic.websocket import JsonWebsocketConsumer
from asgiref.sync import async_to_sync


class WebChatConsumer(JsonWebsocketConsumer):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.channel_id = None
        self.user = None

    def connect(self):
        self.channel_id = self.scope['url_route']['kwargs']['channel_id']
        self.server_id = self.scope['url_route']['kwargs']['server_id']
        self.accept()
        async_to_sync(self.channel_layer.group_add)(
            self.channel_id,
            self.channel_name
        )

    def receive(self, text_data):
        async_to_sync(self.channel_layer.group_send)(
            self.channel_id,
            {
                'type': 'chat_message',
                'message': text_data,
            }
        )

    def chat_message(self, event):
        self.send_json(event)

    def disconnect(self, close_code):
        pass
