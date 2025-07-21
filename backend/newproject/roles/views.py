from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import RoleMasterSerializer
from .models import RoleMaster

from rest_framework.permissions import IsAuthenticated
from accounts.premissions import IsAdminRole

class NewRoleView(APIView):
    permission_classes = [IsAuthenticated, IsAdminRole]
    def post(self, request):
        if not RoleMaster.objects.filter(role_name__iexact="admin").exists():
            return Response(
                {"error": "Cannot add roles until an admin is registered. Please create an admin first."},
                status=status.HTTP_403_FORBIDDEN,
            )
        serializer = RoleMasterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({
                "message": "Role created successfully.",
                "data": serializer.data
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
