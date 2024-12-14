from django.db import models
from django.utils.timezone import now

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

# Event(s)

class Event(models.Model):
    date = models.DateField(default=now)
    max_attendees = models.PositiveIntegerField()
    registered_attendees = models.PositiveIntegerField(default=0) # Amount of people that are already joined in
    time_range = models.DurationField()  # Save for example "1:30:00" for 1h 30min
    price = models.DecimalField(max_digits=10, decimal_places=2)
    recipe = models.ForeignKey(Recipe, related_name='events', on_delete=models.CASCADE)