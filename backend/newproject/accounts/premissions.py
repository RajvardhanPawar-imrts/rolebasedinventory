from rest_framework.permissions import BasePermission

class IsAdminRole(BasePermission):
    """
    Allows access only to admin users.
    Assumes `request.user.user_type.role_name` exists.
    """
    def has_permission(self, request, view):
        user = getattr(request, "user", None)
        # If there's no user or they're not authenticated, reject.
        if not (user and user.is_authenticated):
            return False
        role_name = getattr(getattr(user, "user_type", None), "role_name", "")
        return role_name.lower() == "admin"
