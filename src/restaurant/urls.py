from django.conf.urls import include, url
from django.contrib import admin

from restaurant.menu import urls as menu_urls


urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^menu/', include(menu_urls)),
]
