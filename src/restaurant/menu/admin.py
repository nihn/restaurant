from django.contrib import admin

from restaurant.menu.models import Dish, Menu

admin.site.register([Dish, Menu])
