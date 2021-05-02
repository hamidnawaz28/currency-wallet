from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone


class Wallet(models.Model):
    User = models.ForeignKey(User, on_delete=models.CASCADE)
    WalletAmount = models.JSONField()
    CreatedAt = models.DateField(default=timezone.now)


class History(models.Model):
    transactionOptions = (
        ('Deposit', 'Deposit'),
        ('Withdrawl', 'Withdrawl'),
    )
    User = models.ForeignKey(User, on_delete=models.PROTECT, blank=True)
    TransactionType = models.CharField(max_length=75, choices=transactionOptions ,blank=True, null=True)
    Amount = models.IntegerField(blank=True, null=True)
    Currency = models.CharField(max_length=75, blank=True, null=True)
    CreatedAt = models.DateField(default=timezone.now)
