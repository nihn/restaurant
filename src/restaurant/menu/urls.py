from django.conf.urls import url
from django.views.defaults import page_not_found

from restaurant.menu.views import IndexView, MenusView, DishesPerMenuView


urlpatterns = [
    url(r'^$', IndexView.as_view(), name='menu-index'),
]

apipatterns = [
    url(r'^$', page_not_found, name='menu-api'),
    url(r'^list$', MenusView.as_view(), name='menu-api-list'),
    url(r'^(?P<pk>\d+)/dishes$', DishesPerMenuView.as_view(),
        name='menu-api-dishes'),
]
