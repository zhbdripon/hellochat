from django.contrib import admin

from .models import Channel, Server, ServerCategory

# Register your models here.

admin.site.register(Channel)
admin.site.register(Server)
admin.site.register(ServerCategory)
