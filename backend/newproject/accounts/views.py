from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.db import transaction

from roles.models import RoleMaster
from accounts.models import UserMaster
from usermodules.models import UserRoleModulePermission

from accounts.serializers import UserMasterSerializer
from usermodules.serializers import UserRoleModulePermissionSerializer


# ✅ Admin Register View
class AdminRegisterView(APIView):
    def post(self, request):
        data = request.data.copy()
        required_fields = ['email', 'password', 'first_name', 'last_name', 'mobile_number']
        for field in required_fields:
            if field not in data:
                return Response({"error": f"{field} is required."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            with transaction.atomic():
                # Step 1: Get or create the "admin" role
                role, created = RoleMaster.objects.get_or_create(
                    role_name='admin',
                    defaults={'role_id': 1}
                )

                # Step 2: Assign role ID to user_type
                data['user_type'] = role.pk

                # Step 3: Create User
                user_serializer = UserMasterSerializer(data=data)
                if not user_serializer.is_valid():
                    return Response(user_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

                user = user_serializer.save()

                # Step 4: Create permission only if not already exists
                if not UserRoleModulePermission.objects.filter(user_role_module_id=role.pk).exists():
                    permission_data = {
                        'user_role_module_id': role.pk,
                        'module_permission': ['all']
                    }

                    permission_serializer = UserRoleModulePermissionSerializer(data=permission_data)
                    if permission_serializer.is_valid():
                        permission_serializer.save()
                    else:
                        return Response(permission_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

                return Response({
                    "message": "Admin registered successfully.",
                    "user": user_serializer.data
                }, status=status.HTTP_201_CREATED)

        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


# ✅ Add Generic User View
class AddUserView(APIView):
    def post(self, request):
        data = request.data.copy()

        required_fields = ['email', 'password', 'mobile_number', 'first_name', 'last_name', 'user_type']
        for field in required_fields:
            if field not in data:
                return Response({"error": f"{field} is required."}, status=status.HTTP_400_BAD_REQUEST)
        
        #Check if the user_type is not admin
        admin_role = RoleMaster.objects.filter(role_name__iexact="admin").first()
        admin_role_id = admin_role.role_id if admin_role else None

        if str(data.get("user_type")) == str(admin_role_id):
            return Response(
                {"error": "You cannot create an Admin Role."},
                status=status.HTTP_403_FORBIDDEN,
            )
        
        # Validate that the role (user_type) exists
        try:
            role = RoleMaster.objects.get(pk=data['user_type'])
        except RoleMaster.DoesNotExist:
            return Response({"error": "Provided Role ID does not exists."}, status=status.HTTP_400_BAD_REQUEST)

        # Serialize and save user (password will be hashed in serializer)
        serializer = UserMasterSerializer(data=data)
        if serializer.is_valid():
            user = serializer.save()
            return Response({
                "message": "User created successfully.",
                "data": serializer.data
            }, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
