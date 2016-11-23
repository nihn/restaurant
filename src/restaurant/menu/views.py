from django.views.generic import TemplateView
from rest_framework.generics import ListAPIView
from restaurant.menu.models import Menu

from restaurant.menu.serializers import MenuSerializer, DishSerializer


class IndexView(TemplateView):
    template_name = 'menu/index.html'


class MenusView(ListAPIView):
    queryset = Menu.objects.all()
    serializer_class = MenuSerializer


class DishesPerMenuView(ListAPIView):
    serializer_class = DishSerializer

    def get_queryset(self):
        return Menu.objects.get(pk=self.kwargs['pk']).dishes.all()

