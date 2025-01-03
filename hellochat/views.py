from rest_framework.reverse import reverse
from rest_framework.decorators import api_view
from rest_framework.response import Response


@api_view(["GET"])
def custom_api_root(request, format=None):
    return Response(
        {
            "servers": reverse("server-list", request=request, format=format),
            "channels": reverse(
                "server-channel-list",
                args=["server_id"],
                request=request,
                format=format,
            ),
            "messages": reverse("message-list", request=request, format=format),
        }
    )
