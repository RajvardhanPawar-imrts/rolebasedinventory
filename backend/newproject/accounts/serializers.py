from rest_framework import serializers
from .models import UserMaster
from roles.models import RoleMaster
from django.contrib.auth.hashers import make_password

class UserMasterSerializer(serializers.ModelSerializer):
    user_type = serializers.PrimaryKeyRelatedField(queryset=RoleMaster.objects.all())

    class Meta:
        model = UserMaster
        fields = ['id', 'email', 'mobile_number', 'first_name', 'last_name', 'user_type', 'password']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def create(self, validated_data):
        # Hash the password during creation
        validated_data['password'] = make_password(validated_data['password'])
        return super().create(validated_data)


class MeSerializer(serializers.ModelSerializer):
    role = serializers.CharField(source='user_type.role_name', read_only=True)  # user_type is FK

    class Meta:
        model = UserMaster
        fields = ['id', 'email', 'first_name', 'last_name', 'mobile_number', 'role']
