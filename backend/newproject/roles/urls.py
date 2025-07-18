from django.urls import path
from .views import NewRoleView

urlpatterns = [
    path('new-roles/', NewRoleView.as_view(), name='create-role'),
]
