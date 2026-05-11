"""
URL configuration for core project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
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
from django.urls import path
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.models import User
import json

# @csrf_exempt is used here for PoC simplicity to allow requests from the frontend
# without complex security tokens. In production, we would use proper CSRF protection.
@csrf_exempt
def players_api(request):
    # Handle GET request: Fetch all usernames from the database
    if request.method == 'GET':
        # We use the built-in User model to prove the DB connection works
        users = list(User.objects.values_list('username', flat=True))
        return JsonResponse({'players': users})

    # Handle POST request: Save a new username to the database
    elif request.method == 'POST':
        try:
            # Parse the JSON data sent from the React frontend
            data = json.loads(request.body)
            username = data.get('username')

            # Simple validation: check if username is provided and unique
            if username and not User.objects.filter(username=username).exists():
                User.objects.create(username=username)
                return JsonResponse({'status': 'success', 'username': username}, status=201)

            return JsonResponse({'error': 'Username missing or already exists'}, status=400)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)

# The 'routing' list that maps URLs to the functions above
urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/players/', players_api), # This connects /api/players/ to our function
]
