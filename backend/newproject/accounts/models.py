from django.db import models
from roles.models import RoleMaster
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager

def default_user_image_path():
    return 'user_images/default.png'

class UserMasterManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError("The Email field must be set")
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        return self.create_user(email, password, **extra_fields)
    

class UserMaster(AbstractBaseUser,PermissionsMixin):
    email = models.EmailField(unique=True)
    mobile_number = models.CharField(max_length=15,unique=True)
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    user_type = models.ForeignKey(RoleMaster, on_delete=models.CASCADE)
    password = models.CharField(max_length=128)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    last_login = models.DateTimeField(null=True, blank=True)
    #addressfields
    country = models.CharField(max_length=100, null=True, blank=True)
    state = models.CharField(max_length=100, null=True, blank=True)
    city = models.CharField(max_length=100, null=True, blank=True)
    postal_code = models.CharField(max_length=20, null=True, blank=True)
    #profile image
    user_image = models.ImageField(
        upload_to='user_images/',
        default=default_user_image_path,
        null=True,
        blank=True
    )
    def save(self, *args, **kwargs):
        if self.email:
            self.email = self.email.lower()  # store email in lowercase
        super().save(*args, **kwargs)
    
    objects = UserMasterManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name']