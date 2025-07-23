from rest_framework import serializers
from .models import UserMaster
from roles.models import RoleMaster
from django.contrib.auth.hashers import make_password

class UserMasterSerializer(serializers.ModelSerializer):
    user_type = serializers.PrimaryKeyRelatedField(queryset=RoleMaster.objects.all())

    class Meta:
        model = UserMaster
        fields = ['id', 'email', 'mobile_number', 'first_name', 'last_name', 'user_type', 'password','country','state','city','postal_code','user_image']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def create(self, validated_data):
        # Hash the password during creation
        validated_data['password'] = make_password(validated_data['password'])
        return super().create(validated_data)

    def update(self, instance, validated_data):
        # Prevent normal users from changing "user_type"
        password = validated_data.pop("password", None)
        if password:
            instance.password = make_password(password)
        request = self.context.get("request")
        if request and not request.user.is_staff:
            validated_data.pop("user_type", None)  # remove if provided
        return super().update(instance, validated_data)


class MeSerializer(serializers.ModelSerializer):
    role = serializers.CharField(source='user_type.role_name', read_only=True)
    role_id = serializers.CharField(source='user_type.role_id', read_only=True)

    class Meta:
        model = UserMaster
        fields = ['id', 'first_name', 'last_name', 'role','role_id']
