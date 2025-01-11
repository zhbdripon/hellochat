from django.http import Http404
from drf_spectacular.utils import OpenApiParameter, extend_schema, extend_schema_view
from rest_framework import viewsets
from rest_framework.pagination import PageNumberPagination
from rest_framework.permissions import IsAuthenticated

from .models import Channel, Server
from .serializers import (
    ChannelSerializer,
    ServerCategory,
    ServerSerializer,
    ServerCategorySerializer,
)


@extend_schema_view(
    list=extend_schema(
        parameters=[
            OpenApiParameter(
                name="category_id", type=str, description="Category filter"
            ),
            OpenApiParameter(
                name="limit", type=int, description="Limit the number of results"
            ),
        ],
        responses={200: ServerSerializer(many=True)},
    ),
    post=extend_schema(responses={200: ServerSerializer, 404: "Not found"}),
)
class ServerViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    serializer_class = ServerSerializer

    def get_queryset(self):
        queryset = Server.objects.prefetch_related("channels", "members").filter(
            members=self.request.user
        )
        category = self.request.query_params.get("category")

        if category:
            queryset = queryset.filter(category__id=category)

        return queryset

    def get_object_or_404(self, pk):
        try:
            return self.get_queryset().get(pk=pk)
        except Server.DoesNotExist:
            raise Http404

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


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


class ServerCategoryViewSet(viewsets.ModelViewSet):
    queryset = ServerCategory.objects.all()
    serializer_class = ServerCategorySerializer
    permission_classes = [IsAuthenticated]
    pagination_class = PageNumberPagination
