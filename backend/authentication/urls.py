from django.urls import path
from .views import UserList
from rest_framework_jwt.views import obtain_jwt_token
urlpatterns = [
    path('sign-in/', obtain_jwt_token),
    path('sign-up/', UserList.as_view())
]
