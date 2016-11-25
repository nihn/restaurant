from django.conf.urls import include, url, static
from django.conf import settings
from django.contrib import admin

from restaurant.views import IndexView
from restaurant.menu.urls import (
    urlpatterns as menu_urls,
    apipatterns as api_urls,
)


urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url('^$', IndexView.as_view()),
    url(r'^menu/', include(menu_urls)),
    url(r'^api/menu/', include(api_urls)),
]
urlpatterns += static.static(settings.MEDIA_URL,
                             document_root=settings.MEDIA_ROOT)
