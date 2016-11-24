from django.views.generic import TemplateView
from rest_framework.generics import ListAPIView
from rest_framework.pagination import PageNumberPagination

from restaurant.menu.models import Menu, Dish

from restaurant.menu.serializers import MenuSerializer, DishSerializer


class FetchSizePagination(PageNumberPagination):
    page_size = 1
    page_size_query_param = 'fetch'
    max_page_size = 5


class IndexView(TemplateView):
    template_name = 'menu/index.html'


class MenusView(ListAPIView):
    queryset = Menu.objects.all()
    serializer_class = MenuSerializer
    pagination_class = FetchSizePagination


class DishesPerMenuView(ListAPIView):
    serializer_class = DishSerializer
    pagination_class = FetchSizePagination

    def get_queryset(self):
        return Dish.objects.filter(menu=self.kwargs['pk'])
