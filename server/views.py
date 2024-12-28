from django.http import Http404
from rest_framework import viewsets, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination
from drf_spectacular.utils import extend_schema, OpenApiParameter

from .models import Server
from .serializers import ServerSerializer


class ServerViewSet(viewsets.ViewSet):
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        if self.request.user.is_staff:
            return Server.objects.all()
        return Server.objects.filter(owner=self.request.user)

    def get_object_or_404(self, pk):
        try:
            return self.get_queryset().get(pk=pk)
        except Server.DoesNotExist:
            raise Http404

    @extend_schema(
        parameters=[
            OpenApiParameter(name='category', type=str,
                             description='Category filter'),
            OpenApiParameter(name='limit', type=int,
                             description='Limit the number of results')
        ],
        responses={200: ServerSerializer(many=True)}
    )
    def list(self, request):
        category = request.query_params.get('category')
        queryset = self.get_queryset()

        if category:
            queryset = queryset.filter(category__name=category)

        paginator = PageNumberPagination()
        paginated_queryset = paginator.paginate_queryset(queryset, request)
        serializer = ServerSerializer(paginated_queryset, many=True)
        return paginator.get_paginated_response(serializer.data)

    @extend_schema(
        responses={200: ServerSerializer, 404: 'Not found'}
    )
    def retrieve(self, request, pk=None):
        try:
            server = self.get_object_or_404(pk)
        except Http404:
            return Response({'detail': 'Not found.'}, status=status.HTTP_404_NOT_FOUND)

        serializer = ServerSerializer(server)
        return Response(serializer.data)
