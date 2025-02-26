
from django.contrib import admin
from django.urls import path

from . import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.home, name='home'),  # Ruta para la página principal
    path('base/', views.base, name='base'),  # Ruta para base.html
   #path('operadores/', views.operadores_activos, name='operadores_activos')
]
