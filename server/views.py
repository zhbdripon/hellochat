from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import viewsets
from .models import Server
from .serializers import ServerSerializer


class ServerViewSet(viewsets.ViewSet):
    def list(self, request):
        category = request.query_params.get('category')

        if category is None:
            servers = Server.objects.all()
        else:
            servers = Server.objects.filter(category=category).all()

        serializer = ServerSerializer(servers, many=True)
        return Response(serializer.data)
