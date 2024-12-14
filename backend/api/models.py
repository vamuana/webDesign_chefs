from django.db import models

# Create your models here.

class User(models.Model):
    username = models.CharField(max_length=30)
    password = models.CharField(max_length=200)

# Recipe creation

class Ingredient(models.Model):
    name = models.CharField(max_length=100)

class Recipe(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    secondary_description = models.TextField(blank=True, null=True)
    ingredients = models.ManyToManyField(Ingredient, related_name='recipes')
    image = models.ImageField(upload_to='recipes/', blank=True, null=True)