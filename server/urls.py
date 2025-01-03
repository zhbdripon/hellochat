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

from .views import ServerViewSet, ChannelViewSet
from rest_framework_nested import routers
from django.urls import path, include

server_router = routers.DefaultRouter()
server_router.register("servers", ServerViewSet, basename="server")

channel_router = routers.NestedDefaultRouter(server_router, "servers", lookup="server")
channel_router.register("channels", ChannelViewSet, basename="server-channel")

urlpatterns = [
    path(r"", include(server_router.urls)),
    path(r"", include(channel_router.urls)),
]
