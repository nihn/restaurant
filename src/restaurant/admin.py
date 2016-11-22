from django.contrib import admin

from restaurant.models import Dish, Menu

admin.site.register([Dish, Menu])
