from django.views.generic import ListView

from restaurant.menu.models import Menu


class MenusView(ListView):
    http_method_names = ['get']
    model = Menu
