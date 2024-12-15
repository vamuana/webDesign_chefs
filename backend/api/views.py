from django.shortcuts import render
from rest_framework.views import APIView
from . models import *
from . serializer import *
from rest_framework.response import Response
from rest_framework import generics, status
from django.contrib.auth.hashers import check_password
# Create your views here.

class UserView(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class LoginUserView(APIView):
    serializer_class = UserSerializer

    def post(self, request, format=None): # sessions budu potrebne pri spracovavani udalosti
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            username = serializer.data.get('username')
            password = serializer.data.get('password')
            # SELECT * FROM USERS WHERE NAME:=name
            queryset = User.objects.filter(username=username, password=password)
            if not queryset.exists(): 
                return Response({'status': 'Bad credentials'}, status=status.HTTP_401_UNAUTHORIZED)
                
            if self.request.session['logged']:
                return Response({'status': 'Bad credentials'}, status=status.HTTP_403_FORBIDDEN)
        
            self.request.session['logged'] = username
            return Response({'status': 'User logged in successfully'}, status=status.HTTP_200_OK)
        return Response({'status': 'Invalid data', 'errors': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
    
class RegisterUserView(APIView):
    serializer_class = UserSerializer

    def post(self, request, format=None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()

        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            username = serializer.data.get('username')
            password = serializer.data.get('password')
            queryset = User.objects.filter(username=username)
            
            if queryset.exists():
                return Response(
                    {'status': 'error', 'message': 'Username already taken.'},
                    status=status.HTTP_400_BAD_REQUEST
                )
            
            user = User(username=username,
                        password=password,
                        )
            user.save()
            return Response({'status': 'User Registered successfully'})
        else: 
           return Response({'status': 'Invalid data', 'errors': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
        
class AuthorizeUser(APIView):
    serializer_class = UserSerializer

    def post(self, request, format=None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()

        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():
            username = serializer.data.get('username')
            password = serializer.data.get('password')
            queryset = User.objects.filter(username=username)

            if queryset.exists():
                user = queryset[0]
                if (user.password == password):
                    return Response({'status': 'User logged in successfully.'}, status=status.HTTP_200_OK)
                return Response({'status': 'Invalid password', 'errors': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)  
            return Response({'status': 'Invalid username', 'errors': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)               
        return Response({'status': 'Invalid data', 'errors': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
    
# Recipes

class IngredientsView(generics.ListAPIView):
    queryset = Ingredient.objects.all()
    serializer_class = IngredientSerializer

class RecipesView(generics.ListAPIView):
    queryset = Recipe.objects.all()
    serializer_class = RecipeSerializer

class RecipeCreateView(APIView):
    def post(self, request, format=None):
        data = request.data
        title = data.get('title')
        description = data.get('description')
        secondary_description = data.get('secondary_description', '')
        image = request.FILES.get('image', None)
        print("Uploaded image:", image)

        # Extrahovanie ingrediencií
        ingredients_data = []
        for key, value in data.items():
            if key.startswith('ingredients[') and key.endswith('][name]'):
                ingredients_data.append({'name': value})

        print("Extracted ingredients:", ingredients_data)
        print("data", data)

        if not title or not description or not ingredients_data:
            print('Ingredients error')
            return Response(
                {"error": "Title, description, and at least one ingredient are required."}, 
                status=status.HTTP_400_BAD_REQUEST
            )

        recipe = Recipe.objects.create(
            title=title,
            description=description,
            secondary_description=secondary_description,
            image=image
        )

        for ingredient in ingredients_data:
            ingredient_obj, created = Ingredient.objects.get_or_create(name=ingredient['name'])
            recipe.ingredients.add(ingredient_obj)

        recipe.save()

        serializer = RecipeSerializer(recipe)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    
# Events 
class EventsView(generics.ListAPIView):
    queryset = Event.objects.all()
    serializer_class = EventDetailSerializer

class EventCreateView(APIView):
    def post(self, request, format=None):
        print("Received data:", request.data)
        serializer = EventSerializer(data=request.data)
        
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(
            {"error": "Invalid data", "details": serializer.errors}, 
            status=status.HTTP_400_BAD_REQUEST
        )
    
class EventJoinView(APIView):
    def post(self, request, pk, format=None):
        try:
            event = Event.objects.get(pk=pk)
        except Event.DoesNotExist:
            return Response(
                {"error": "Event not found"}, 
                status=status.HTTP_404_NOT_FOUND
            )

        if event.registered_attendees >= event.max_attendees:
            return Response(
                {"error": "The event is already full"}, 
                status=status.HTTP_400_BAD_REQUEST
            )

        event.registered_attendees += 1
        event.save()

        serializer = EventSerializer(event)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
class EventLeaveView(APIView):
    def post(self, request, pk, format=None):
        try:
            event = Event.objects.get(pk=pk)
        except Event.DoesNotExist:
            return Response(
                {"error": "Event not found"}, 
                status=status.HTTP_404_NOT_FOUND
            )

        if event.registered_attendees <= 0:
            return Response(
                {"error": "No attendees to remove"}, 
                status=status.HTTP_400_BAD_REQUEST
            )

        event.registered_attendees -= 1
        event.save()

        serializer = EventSerializer(event)
        return Response(serializer.data, status=status.HTTP_200_OK)