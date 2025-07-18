from django.urls import path
from .views import AdminRegisterView, AddUserView

urlpatterns = [
    path('admin/register/', AdminRegisterView.as_view(), name='admin-register'),
    path('add-user/', AddUserView.as_view(), name='add-user'),
]
