from django.shortcuts import render
from rest_framework.views import APIView
from . models import *
from . serializer import *
from rest_framework.response import Response
from rest_framework import generics, status
# Create your views here.

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