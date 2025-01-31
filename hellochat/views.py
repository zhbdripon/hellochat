from django.http import JsonResponse
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_protect, ensure_csrf_cookie
from djoser.social.views import ProviderAuthView
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.reverse import reverse
from rest_framework.views import APIView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView


@api_view(["GET"])
def custom_api_root(request, format=None):
    return Response(
        {
            "servers": reverse("server-list", request=request, format=format),
            "server-categories": reverse(
                "server-category-list", request=request, format=format
            ),
            "server-invitations": reverse(
                "server-invitation-list", request=request, format=format
            ),
            "channels": reverse(
                "server-channel-list",
                args=["server_id"],
                request=request,
                format=format,
            ),
            "channel-categories": reverse(
                "channel-category-list",
                args=["server_id"],
                request=request,
                format=format,
            ),
            "messages": reverse("message-list", request=request, format=format),
        }
    )


@ensure_csrf_cookie
def csrf_view(request):
    return JsonResponse({"detail": "CSRF cookie set"})


def set_cookie_on_response(response):
    access_token = response.data.pop("access")
    refresh_token = response.data.pop("refresh")

    response.set_cookie(
        "access_token",
        access_token,
        httponly=True,
        secure=True,
        samesite="Lax",
        max_age=15 * 60,  # 15 minutes
    )

    response.set_cookie(
        "refresh_token",
        refresh_token,
        httponly=True,
        secure=True,
        samesite="Lax",
        max_age=7 * 24 * 60 * 60,  # 7 days
    )

    return response


@method_decorator(csrf_protect, name="dispatch")
class CustomTokenObtainPairView(TokenObtainPairView):
    def post(self, request: Request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)

        if response.status_code == status.HTTP_200_OK:
            return set_cookie_on_response(response)

        return response


@method_decorator(csrf_protect, name="dispatch")
class CustomTokenRefreshView(TokenRefreshView):
    def post(self, request: Request, *args, **kwargs):
        refresh_token = request.COOKIES.get("refresh_token")
        if not refresh_token:
            return Response({"error": "Refresh token missing"}, status=401)

        request.data["refresh"] = refresh_token
        response = super().post(request, *args, **kwargs)
        if response.status_code == status.HTTP_200_OK:
            access_token = response.data.pop("access")
            response.set_cookie(
                "access_token",
                access_token,
                httponly=True,
                secure=True,
                samesite="Lax",
                max_age=15 * 60,
            )

        return response


class CustomSocialProviderAuthView(ProviderAuthView):
    def post(self, request, *args, **kwargs):
        response = super().create(request, *args, **kwargs)

        if response.status_code == status.HTTP_201_CREATED:
            return set_cookie_on_response(response)

        return response


class LogoutView(APIView):
    def post(self, request):
        response = Response({"detail": "Logged out"})
        response.delete_cookie("access_token")
        response.delete_cookie("refresh_token")
        return response
