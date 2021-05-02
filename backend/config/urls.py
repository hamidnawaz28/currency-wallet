from django.contrib import admin
from django.urls import path, include, re_path
from . import views as iview

urlpatterns = [
    re_path(r'^((?!(api|admin)).)*$', iview.index, name='index'),
    path('admin/', admin.site.urls),
    path('api/auth/', include('authentication.urls')),
    path('api/wallet/', include('wallet.urls'))
]
