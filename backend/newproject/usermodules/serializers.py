from rest_framework import serializers
from .models import UserRoleModulePermission
from roles.models import RoleMaster

class UserRoleModulePermissionSerializer(serializers.ModelSerializer):
    user_role_module_id = serializers.PrimaryKeyRelatedField(queryset=RoleMaster.objects.all())
    
    class Meta:
        model = UserRoleModulePermission
        fields = ['id', 'user_role_module_id', 'module_permission']
