from django.urls import path
from . import views

urlpatterns = [  
    path('', views.home, name="base"),  # app homepage
    path('map', views.map_view, name="base"), 
    ]