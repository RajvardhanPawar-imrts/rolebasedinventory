from django.urls import path
from .views import RolePermissionView

urlpatterns = [
    path('user-permission/<int:role_id>/', RolePermissionView.as_view(), name='role-permission'),
]
