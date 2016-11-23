from django.conf.urls import url

from restaurant.menu.views import IndexView, MenusView, DishesPerMenuView


urlpatterns = [
    url(r'^$', IndexView.as_view(), name='menu-index'),
    url(r'^list$', MenusView.as_view(), name='menu-list'),
    url(r'^(?P<pk>\d+)/dishes$', DishesPerMenuView.as_view(),
        name='menu-dishes'),
]
