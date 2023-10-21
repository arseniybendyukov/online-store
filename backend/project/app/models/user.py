from django.db import models
from django.contrib.auth.models import (
  BaseUserManager, AbstractBaseUser, PermissionsMixin
)
from django.utils import timezone
from app.validators import PHONE_NUMBER_VALIDATOR
from app.color import get_random_blue_color
from .product import Product


class UserManager(BaseUserManager):
  def _create_user(self, email, password, **extra_fields):
    if not email:
      raise ValueError('The given email must be set')
    try:
      with transaction.atomic():
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user
    except:
      raise

  def create_user(self, email, password=None, **extra_fields):
    extra_fields.setdefault('is_staff', False)
    extra_fields.setdefault('is_superuser', False)
    return self._create_user(email, password, **extra_fields)

  def create_superuser(self, email, password, **extra_fields):
    extra_fields.setdefault('is_staff', True)
    extra_fields.setdefault('is_superuser', True)
    return self._create_user(email, password=password, **extra_fields)
    

class User(AbstractBaseUser, PermissionsMixin):
  email = models.EmailField(max_length=40, unique=True)
  first_name = models.CharField(max_length=30, blank=True, verbose_name='Имя')
  last_name = models.CharField(max_length=30, blank=True, verbose_name='Фамилия')
  patronymic = models.CharField(max_length=100, null=True, blank=True, verbose_name='Отчество')
  birthdate = models.DateField(null=True, blank=True, verbose_name='Дата рождения')
  image = models.ImageField(null=True, blank=True, upload_to='users/', verbose_name='Изображение')
  color = models.CharField(max_length=18, default='rgb(7, 83, 161)', verbose_name='Цвет аватара (без картинки)')
  phone_number = models.CharField(
    max_length=17,
    validators=[PHONE_NUMBER_VALIDATOR],
    null=True,
    blank=True,
    verbose_name='Номер телефона',
  )
  saved_products = models.ManyToManyField(Product, blank=True, verbose_name='Сохраненные товары')

  is_active = models.BooleanField(default=True)
  is_staff = models.BooleanField(default=False)
  date_joined = models.DateTimeField(default=timezone.now)

  is_email_verified = models.BooleanField(default=False)

  objects = UserManager()

  USERNAME_FIELD = 'email'
  REQUIRED_FIELDS = ['first_name', 'last_name']

  def get_fullname(self):
    return f'{self.first_name} {self.last_name}'

  def save(self, *args, **kwargs):
    if self.pk is None:
      self.color = get_random_blue_color()
    super(User, self).save(*args, **kwargs)
    return self

  def __str__(self):
    return self.get_fullname()

  class Meta:
    verbose_name = 'Пользователь'
    verbose_name_plural = 'Пользователи'
