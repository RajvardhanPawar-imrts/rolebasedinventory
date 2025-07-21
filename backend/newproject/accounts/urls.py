from django.urls import path
from .views import AdminRegisterView, AddUserView, CustomTokenObtainPairView, MeView
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('admin/register/', AdminRegisterView.as_view(), name='admin-register'),
    path('add-user/', AddUserView.as_view(), name='add-user'),
    path('me/', MeView.as_view(), name='me-endpoint'),
    path('login/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
