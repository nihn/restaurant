from django.conf.urls import include, url
from django.contrib import admin

from restaurant.views import IndexView
from restaurant.menu import urls as menu_urls


urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url('^$', IndexView.as_view()),
    url(r'^menu/', include(menu_urls)),
]
