from django.http import Http404
from drf_spectacular.utils import OpenApiParameter, extend_schema
from rest_framework import status, viewsets
from rest_framework.pagination import PageNumberPagination
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .models import Channel, Server
from .serializers import ChannelSerializer, ServerSerializer


class ServerViewSet(viewsets.ViewSet):
    permission_classes = [IsAuthenticated]
    serializer_class = ServerSerializer

    def get_queryset(self):
        return Server.objects.filter(members=self.request.user).all()

    def get_object_or_404(self, pk):
        try:
            return self.get_queryset().get(pk=pk)
        except Server.DoesNotExist:
            raise Http404

    @extend_schema(
        parameters=[
            OpenApiParameter(name="category", type=str, description="Category filter"),
            OpenApiParameter(
                name="limit", type=int, description="Limit the number of results"
            ),
        ],
        responses={200: ServerSerializer(many=True)},
    )
    def list(self, request):
        category = request.query_params.get("category")
        queryset = self.get_queryset()

        if category:
            queryset = queryset.filter(category__name=category)

        paginator = PageNumberPagination()
        paginated_queryset = paginator.paginate_queryset(queryset, request)
        serializer = ServerSerializer(paginated_queryset, many=True)
        return paginator.get_paginated_response(serializer.data)

    @extend_schema(responses={200: ServerSerializer, 404: "Not found"})
    def retrieve(self, request, pk=None):
        try:
            server = self.get_object_or_404(pk)
        except Http404:
            return Response({"detail": "Not found."}, status=status.HTTP_404_NOT_FOUND)

        serializer = ServerSerializer(server)
        return Response(serializer.data)


class ChannelViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    serializer_class = ChannelSerializer
    pagination_class = PageNumberPagination

    def get_queryset(self):
        server_id = self.kwargs.get("server_pk")

        return (
            Channel.objects.filter(server__pk=server_id)
            .filter(server__members=self.request.user)
            .all()
        )

    def get_serializer_context(self):
        return {"request": self.request}

    def get_object_or_404(self, pk):
        try:
            return self.get_queryset().get(pk=pk)
        except Channel.DoesNotExist:
            raise Http404
