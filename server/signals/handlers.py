from django.dispatch import receiver
from server.models import Server, Channel

from webchat.signals import user_belongs_to_server, user_has_access_to_channel


@receiver(user_belongs_to_server)
def handle_user_belongs_to_server(sender, **kwargs):
    try:
        server = Server.objects.get(id=kwargs["server_id"])
        return server.members.filter(id=kwargs["user"].id).exists()
    except Exception as e:
        return False


@receiver(user_has_access_to_channel)
def handle_user_has_access_to_channel(sender, **kwargs):
    try:
        return (
            Channel.objects.get(id=kwargs.get("channel_id"))
            .server.members.filter(id=kwargs.get("user_id"))
            .exists()
        )
    except Exception as e:
        print("on execption")
        return False
