from rest_framework.serializers import ModelSerializer

from restaurant.menu.models import Dish, Menu


class MenuSerializer(ModelSerializer):
    class Meta:
        model = Menu
        fields = '__all__'


class DishSerializer(ModelSerializer):
    class Meta:
        model = Dish
        fields = '__all__'
