from django.dispatch import receiver
from server.models import Server

from webchat.signals import user_belongs_to_server


@receiver(user_belongs_to_server)
def handle_user_belongs_to_server(sender, **kwargs):
    try:
        server = Server.objects.get(id=kwargs['server_id'])
        return server.members.filter(id=kwargs['user'].id).exists()
    except Exception as e:
        return False
