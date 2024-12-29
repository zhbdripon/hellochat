from channels.generic.websocket import JsonWebsocketConsumer
from asgiref.sync import async_to_sync


class WebChatConsumer(JsonWebsocketConsumer):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.room_name = 'chat_room'

    def connect(self):
        self.accept()
        async_to_sync(self.channel_layer.group_add)(
            self.room_name,
            self.channel_name
        )

    def receive(self, text_data):
        async_to_sync(self.channel_layer.group_send)(
            self.room_name,
            {
                'type': 'chat_message',
                'message': text_data,
            }
        )

    def chat_message(self, event):
        self.send_json(event)

    def disconnect(self, close_code):
        pass
