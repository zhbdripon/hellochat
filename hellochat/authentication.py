from django.http import HttpResponseForbidden
from django.middleware.csrf import CsrfViewMiddleware
from rest_framework import exceptions
from rest_framework.authentication import CSRFCheck
from rest_framework.request import Request
from rest_framework_simplejwt.authentication import JWTAuthentication


class CustomJWTAuthentication(JWTAuthentication):
    def authenticate(self, request: Request):
        access_token = request.COOKIES.get("access_token")

        if access_token is None:
            return None

        validated_token = self.get_validated_token(access_token)

        return self.get_user(validated_token), validated_token
