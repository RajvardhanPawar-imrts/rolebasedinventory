from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from roles.models import RoleMaster
from .models import UserRoleModulePermission
from .serializers import UserRoleModulePermissionSerializer

from rest_framework.permissions import IsAuthenticated
from accounts.premissions import IsAdminRole

class RolePermissionView(APIView):

    def get_permissions(self):
        if self.request.method == 'POST':
            return [IsAuthenticated(), IsAdminRole()]
        return [IsAuthenticated()]

    def post(self, request, role_id):
        # permission_classes = [IsAuthenticated, IsAdminRole]
        try:
            role = RoleMaster.objects.get(pk=role_id)
        except RoleMaster.DoesNotExist:
            return Response({"error": "Role not found."}, status=status.HTTP_404_NOT_FOUND)

        # ❌ Reject updating admin permissions
        if role.role_name.lower() == 'admin':
            return Response(
                {"error": "Cannot update permissions for 'admin' role. Admin has all permissions by default."},
                status=status.HTTP_403_FORBIDDEN
            )

        # ✔️ Continue with non-admin roles
        permission_data = {
            'user_role_module_id': role.pk,
            'module_permission': request.data.get('module_permission', [])
        }

        # Check if permission entry exists -> Update, else Create
        try:
            permission_obj = UserRoleModulePermission.objects.get(user_role_module_id=role.pk)
            serializer = UserRoleModulePermissionSerializer(permission_obj, data=permission_data)
        except UserRoleModulePermission.DoesNotExist:
            serializer = UserRoleModulePermissionSerializer(data=permission_data)

        if serializer.is_valid():
            serializer.save()
            return Response({
                "message": "Permissions updated successfully.",
                "data": serializer.data
            }, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

    def get(self, request, role_id):
        try:
            role = RoleMaster.objects.get(pk=role_id)
        except RoleMaster.DoesNotExist:
            return Response({"error": "Role not found."}, status=status.HTTP_404_NOT_FOUND)
        
        permissions = UserRoleModulePermission.objects.filter(user_role_module_id=role)
        module_list = []
        for per in permissions:
            module_list.extend(per.module_permission)
        module_list = list(set(module_list))

        return Response({
            "role": role.role_name,
            "modules": module_list
        }, status=status.HTTP_200_OK)

