from rest_framework import serializers
from . models import *

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model=User
        fields=['username', 'password']

class IngredientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ingredient
        fields = ['id', 'name']

class RecipeSerializer(serializers.ModelSerializer):
    ingredients = IngredientSerializer(many=True)
    image = serializers.ImageField(required=False)

    class Meta:
        model = Recipe
        fields = ['id', 'title', 'description', 'secondary_description', 'ingredients', 'image']
