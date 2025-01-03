"""
URL configuration for hellochat project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

import debug_toolbar
from django.contrib import admin
from django.urls import path, include, re_path
from django.conf import settings
from django.conf.urls.static import static
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView
from webchat.consumer import WebChatConsumer
from django.shortcuts import redirect
from .views import custom_api_root

urlpatterns = [
    path(
        "api/",
        include(
            [
                path("", custom_api_root),
                path("", include("server.urls")),
                path("", include("webchat.urls")),
                path("docs/schema/", SpectacularAPIView.as_view(), name="schema"),
                path(
                    "docs/swagger/ui/",
                    SpectacularSwaggerView.as_view(url_name="schema"),
                ),
                re_path(r"^auth/", include("djoser.urls")),
                re_path(r"^auth/", include("djoser.urls.jwt")),
            ]
        ),
    ),
    path("admin/", admin.site.urls),
    path("__debug__/", include(debug_toolbar.urls)),
    path("", lambda request: redirect("api/", permanent=False)),
]

websocket_urlpatterns = [
    path("server/<str:server_id>/channel/<str:channel_id>", WebChatConsumer.as_asgi())
]

if settings.DEBUG:
    import debug_toolbar

    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
