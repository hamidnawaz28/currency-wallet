from rest_framework import viewsets
from rest_framework.response import Response
from .models import History, Wallet
from .serializers import WalletHistorySerializer, WalletSerializer
import pdb
from rest_framework.generics import get_object_or_404
from django.contrib.auth.models import User

# from rest_framework.permissions import IsAuthenticated
# from rest_framework import status


class WalletHistoryView(viewsets.ViewSet):
    # authentication_classes = [JWTAuthentication]
    # permission_classes = [IsAuthenticated]
    def list(self, request):
        params = self.request.query_params
        user = params.get("user")
        current_page = int(params.get("page"))
        per_page = int(params.get("perPage"))
        start = per_page * current_page
        end = per_page * current_page + per_page
        user_object = User.objects.get(pk=user)
        history_object = History.objects.filter(User=user_object.pk)
        history = history_object[start:end]
        count = history_object.count()
        serializer = WalletHistorySerializer(
            history, many=True, context={"request": request})

        response_dict = {
            'data': serializer.data,
            'count': count
        }
        return Response(response_dict)


class WalletView(viewsets.ViewSet):
    # authentication_classes = [JWTAuthentication]
    # permission_classes = [IsAuthenticated]
    def list(self, request):
        params = self.request.query_params
        user = params.get("user")
        user_object = User.objects.get(pk=user)
        wallet_object = Wallet.objects.filter(User=user_object.pk)
        serializer = WalletSerializer(
            wallet_object, many=True, context={"request": request})
        return Response(serializer.data)

    def update(self, request, pk=id):
        try:
            queryset = Wallet.objects.all()
            user_wallet = get_object_or_404(queryset, User=pk)
            data = request.data
            currency = data["Currency"]
            amount = int(data["Amount"])
            all_amount = user_wallet.WalletAmount
            current_amount = int(all_amount[currency])
            updated_amount = current_amount + amount
            all_amount[currency] = updated_amount
            new_data = {"WalletAmount": all_amount, "User": user_wallet.User.pk}
            serializer = WalletSerializer(
                user_wallet, data=new_data, context={"request": request})
            serializer.is_valid(raise_exception=True)
            serializer.save()
            history_data = {
                "User": pk,
                "TransactionType": "Deposit",
                "Amount": amount,
                "Currency": currency
            }
            history_serializer = WalletHistorySerializer(
                data=history_data, context={"request": request})
            history_serializer.is_valid(raise_exception=True)
            history_serializer.save()
            dict_response = {
                "error": False,
                "message": "Successfully Depositeds",
                "data": serializer.data
            }
        except:
            dict_response = {
                'error': True,
                'message': "Error During Update"
            }
        return Response(dict_response)


class WalletWithdrawlView(viewsets.ViewSet):
    # authentication_classes = [JWTAuthentication]
    # permission_classes = [IsAuthenticated]

    def update(self, request, pk=id):
        try:
            queryset = Wallet.objects.all()
            user_wallet = get_object_or_404(queryset, User=pk)
            data = request.data
            currency = data["Currency"]
            new_amount = int(data["Amount"])
            all_amounts = user_wallet.WalletAmount
            current_amount = int(all_amounts[currency])
            if current_amount >= new_amount:
                updated_amount = current_amount - new_amount
                all_amounts[currency] = updated_amount
                new_data = {
                    "WalletAmount": all_amounts,
                    "User": user_wallet.User.pk
                }
                serializer = WalletSerializer(
                    user_wallet, data=new_data, context={"request": request})
                serializer.is_valid(raise_exception=True)
                serializer.save()
                history_data = {
                    "User": pk,
                    "TransactionType": "Withdrawl",
                    "Amount": new_amount,
                    "Currency": currency
                }
                history_serializer = WalletHistorySerializer(
                    data=history_data, context={"request": request})
                history_serializer.is_valid(raise_exception=True)
                history_serializer.save()
                dict_response = {
                    "error": False,
                    "message": "Withdrawl Successful",
                    "data": serializer.data
                }
            else:
                dict_response = {
                    "error": True,
                    "message": "Insufficient Amount"
                }
        except:
            dict_response = {
                'error': True,
                'message': "Error During Update"
            }
        return Response(dict_response)
