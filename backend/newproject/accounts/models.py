from django.db import models
from roles.models import RoleMaster

class UserMaster(models.Model):
    email = models.EmailField(unique=True)
    mobile_number = models.CharField(max_length=15,unique=True)
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    user_type = models.ForeignKey(RoleMaster, on_delete=models.CASCADE)
    password = models.CharField(max_length=128)

    def __str__(self):
        return self.email
