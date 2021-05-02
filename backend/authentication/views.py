from django.http import HttpResponseRedirect
from django.contrib.auth.models import User
from rest_framework import permissions, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import UserSerializer, UserSerializerWithToken, WalletSerializer
from django.core import serializers
import requests
import json
import pdb
def mutate_dict(f,d):
    for k, v in d.items():
        d[k] = f(v)
@api_view(['GET'])
def current_user(request):
    """
    Determine the current user by their token, and return their data
    """
    serializer = UserSerializer(request.user)
    return Response(serializer.data)


class UserList(APIView):
    """
    Create a new user. It's called 'UserList' because normally we'd have a get
    method here too, for retrieving a list of all User objects.
    """

    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        serializer = UserSerializerWithToken(data=request.data)
        if serializer.is_valid():
            serializer.save()
            username = serializer["username"].value
            user_ref = User.objects.filter(username=username)
            user_ref_serialized = json.loads(serializers.serialize("json", user_ref))
            responce = requests.get("https://api.exchangerate.host/latest").json()
            rates = responce['rates']
            mutate_dict(lambda x: 0, rates)
            init_walled = {
                "WalletAmount": rates,
                "User": user_ref_serialized[0]["pk"]
            }
            wallet_serializer = WalletSerializer(
                data=init_walled, context={"request": request})
            wallet_serializer.is_valid(raise_exception=True)
            wallet_serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
