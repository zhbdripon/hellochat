import os
import jwt
import django
import logging
from channels.db import database_sync_to_async

logger = logging.getLogger(__name__)

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "hellochat.settings")
django.setup()

from django.contrib.auth.models import AnonymousUser  # noqa
from django.contrib.auth import get_user_model  # noqa
from django.conf import settings  # noqa

User = get_user_model()


@database_sync_to_async
def get_user(scope):
    try:
        cookies = {}
        headers = dict(scope["headers"])
        if b"cookie" in headers:
            cookie_header = headers[b"cookie"].decode()
            cookies = {
                k.strip(): v.strip()
                for k, v in (cookie.split("=") for cookie in cookie_header.split(";"))
            }

        access_token = cookies.get("access_token")

        decoded_token = jwt.decode(
            access_token, settings.SECRET_KEY, algorithms=["HS256"]
        )
        user_id = decoded_token.get("user_id")

        if user_id is None:
            raise User.DoesNotExist

        return User.objects.get(id=user_id)

    except Exception as e:
        return AnonymousUser()


class QueryAuthMiddleware:
    """
    Custom middleware (insecure) that takes user IDs from the query string.
    """

    def __init__(self, app):
        # Store the ASGI application we were passed
        self.app = app

    async def __call__(self, scope, receive, send):
        # Look up user from query string (you should also do things like
        # checking if it is a valid user ID, or if scope["user"] is already
        # populated).
        scope["user"] = await get_user(scope)

        return await self.app(scope, receive, send)


# Middleware for logging incoming requests and outgoing responses (debug purposes)
class RequestLoggingMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        # Log the incoming request details
        self.log_request(request)

        # Call the next middleware or the view
        response = self.get_response(request)

        # Optionally log the response
        self.log_response(request, response)

        return response

    def log_request(self, request):
        if request.method in ["POST", "PUT", "PATCH"]:
            try:
                logger.info(f"Body: {request.body.decode('utf-8')}")
            except Exception as e:
                logger.warning(f"Could not decode request body: {e}")

    def log_response(self, request, response):
        logger.info(f"Response Status: {response.status_code}")
        return response
