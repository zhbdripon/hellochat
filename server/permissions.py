from rest_framework import permissions
from .models import Server


class IsServerMember(permissions.BasePermission):
    def has_permission(self, request, view):
        return Server.objects.filter(
            id=view.kwargs.get("server_pk"), members__id=request.user.id
        ).exists()
