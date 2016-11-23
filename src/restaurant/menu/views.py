from django.views.generic import TemplateView
from rest_framework.serializers import ModelSerializer

from rest_framework.generics import ListAPIView

from restaurant.menu.models import Menu, Dish


class MenuSerializer(ModelSerializer):
    class Meta:
        model = Menu
        fields = '__all__'


class DishSerializer(ModelSerializer):
    class Meta:
        model = Dish
        fields = '__all__'


class IndexView(TemplateView):
    template_name = 'menu/index.html'


class MenusView(ListAPIView):
    queryset = Menu.objects.all()
    serializer_class = MenuSerializer


class DishesPerMenuView(ListAPIView):
    serializer_class = DishSerializer

    def get_queryset(self):
        return Menu.objects.get(pk=self.kwargs['pk']).dishes.all()

