from django.db import models
from roles.models import RoleMaster
from django.contrib.postgres.fields import ArrayField

class UserRoleModulePermission(models.Model):
    user_role_module_id = models.ForeignKey(RoleMaster, on_delete=models.CASCADE)
    module_permission = ArrayField(
        models.CharField(max_length=100), 
        default=list,
        blank=True,
        help_text="List of allowed modules or ['all'] for full access."
    )

    def __str__(self):
        return f"{self.user_role_module_id.role_name}: {self.module_permission}"
