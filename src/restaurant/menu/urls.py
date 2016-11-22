from django.conf.urls import url

from restaurant.menu.views import MenusView


urlpatterns = [
    url(r'^', MenusView.as_view(), name='menu-list'),
]
