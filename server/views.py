from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import viewsets
from .models import Server
from .serializers import ServerSerializer
from rest_framework import status
from rest_framework.permissions import IsAuthenticated


class ServerViewSet(viewsets.ViewSet):

    queryset = Server.objects.all()
    permission_classes = [IsAuthenticated]

    def list(self, request):
        category = request.query_params.get('category')
        by_user = request.query_params.get('by_user') == 'true'
        limit = request.query_params.get('limit')

        if category:
            self.queryset = self.queryset.filter(category__name=category)

        if by_user:
            self.queryset = self.queryset.filter(owner=request.user)

        if limit:
            self.queryset = self.queryset[:int(limit)]

        serializer = ServerSerializer(self.queryset, many=True)
        return Response(serializer.data)
