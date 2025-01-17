from django.contrib.auth import get_user_model
from django.http import Http404
from drf_spectacular.utils import OpenApiParameter, extend_schema, extend_schema_view
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.exceptions import PermissionDenied
from rest_framework.pagination import PageNumberPagination
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .models import Channel, Server, ServerInvitation
from .serializers import (
    ChannelSerializer,
    ServerCategory,
    ServerCategorySerializer,
    ServerInvitationSerializer,
    ServerSerializer,
    ServerNonMemberSerializer,
)

User = get_user_model()


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
    pagination_class = PageNumberPagination

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
        serializer.save(owner=self.request.user, members=[self.request.user])

    @extend_schema(
        parameters=[
            OpenApiParameter(
                name="search", type=str, description="Search term for username or email"
            ),
            OpenApiParameter(name="server_id", type=int, description="Server ID"),
            OpenApiParameter(name="page", type=int, description="Page number"),
            OpenApiParameter(
                name="page_size", type=int, description="Number of results per page"
            ),
        ],
        responses={200: "Paginated list of users not in the server"},
    )
    @action(detail=False, methods=["get"], url_path="search-non-members")
    def search_non_members(self, request):
        search_term = request.query_params.get("search", "")
        server_id = request.query_params.get("server_id")

        if not server_id:
            return Response({"detail": "Server ID is required."}, status=400)

        try:
            server = Server.objects.get(id=server_id)
        except Server.DoesNotExist:
            return Response({"detail": "Server not found."}, status=404)

        if request.user not in server.members.all():
            return Response(
                {"detail": "You do not have permission to access this server."},
                status=403,
            )

        non_members = User.objects.exclude(
            id__in=server.members.values_list("id", flat=True)
        )

        if search_term:
            non_members = non_members.filter(
                username__icontains=search_term
            ) | non_members.filter(email__icontains=search_term)

        paginator = self.pagination_class()
        paginated_data = paginator.paginate_queryset(non_members, request)
        serializer = ServerNonMemberSerializer(paginated_data, many=True)
        return paginator.get_paginated_response(serializer.data)


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


class ServerInvitationViewSet(viewsets.ModelViewSet):
    serializer_class = ServerInvitationSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return ServerInvitation.objects.filter(server__owner=user).select_related(
            "server", "inviter", "invitee"
        )

    def perform_create(self, serializer):
        server = serializer.validated_data["server"]
        if server.owner != self.request.user:
            raise PermissionDenied(
                "You do not have permission to invite users to this server."
            )
        serializer.save(inviter=self.request.user)
