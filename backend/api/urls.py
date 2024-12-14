"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import include, path
from django.conf.urls import *
from api.views import *

urlpatterns = [
    # Users
    path('users/', UserView.as_view()),
    path('login/', LoginUserView.as_view()),
    path('register/', RegisterUserView.as_view()),
    path('authenticate/', AuthorizeUser.as_view()),
    # Recipes
    path('ingredients/', IngredientsView.as_view()),
    path('recipes/', RecipesView.as_view()),
    path('create-recipe/', RecipeCreateView.as_view()),
    # events
    path('events/', EventsView.as_view()),
    path('create-event/', EventCreateView.as_view()),
    path('join-event/<int:pk>/', EventJoinView.as_view()),
    path('leave-event/<int:pk>/', EventLeaveView.as_view()),
]