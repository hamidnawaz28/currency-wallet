from django.urls import path, include
from rest_framework import routers
from .views import WalletHistoryView, WalletView, WalletWithdrawlView
router = routers.DefaultRouter()
router.register("wallet-history", WalletHistoryView, basename='wallet-history')
router.register("wallet-details", WalletView, basename='wallet-details')
router.register("wallet-with-drawl", WalletWithdrawlView, basename='wallet-with-drawl')
urlpatterns = [
	path('', include(router.urls)),
]
