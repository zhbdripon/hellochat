from channels.generic.websocket import WebsocketConsumer


class MyConsumer(WebsocketConsumer):

    def connect(self):
        # Called on connection.
        # To accept the connection call:
        self.accept()

    def receive(self, text_data=None, bytes_data=None):
        # Called with either text_data or bytes_data for each frame
        # You can call:
        self.send(text_data=text_data)
        # self.close()

    def disconnect(self, close_code):
        pass
        # Called when the socket closes
