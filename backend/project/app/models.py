from django.db import models
from datetime import datetime
from django.utils import timezone
from django.db import transaction
from django.db.models import Avg
from .utils import format_datetime
from .validators import PERCENTAGE_VALIDATOR, RATING_VALIDATOR, PHONE_NUMBER_VALIDATOR
from django.contrib.auth.models import (
  AbstractBaseUser, PermissionsMixin, BaseUserManager
)


class Appeal(models.Model):
  full_name = models.CharField(max_length=100, verbose_name='Полное имя')
  email = models.EmailField(max_length=40, verbose_name='Электронная почта')
  phone_number = models.CharField(
    max_length=17,
    validators=[PHONE_NUMBER_VALIDATOR],
    verbose_name='Номер телефона',
  )
  text = models.TextField()
  created_at = models.DateTimeField(auto_now_add=True, verbose_name='Дата и время создания')

  def __str__(self):
    created_at = format_datetime(self.created_at)
    return f'{self.full_name}, {self.email}, {self.phone_number}, {created_at}'

  class Meta:
    verbose_name = 'Обращение по форме'
    verbose_name_plural = 'Обращения по форме'


class Category(models.Model):
  name = models.CharField(max_length=100, verbose_name='Название')

  def __str__(self):
    return self.name

  class Meta:
    verbose_name = 'Категория товара'
    verbose_name_plural = 'Категории товара'


class Subcategory(models.Model):
  name = models.CharField(max_length=100, verbose_name='Название')
  category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='subcategories', verbose_name='Категория')

  def __str__(self):
    return self.name

  class Meta:
    verbose_name = 'Подкатегория товара'
    verbose_name_plural = 'Подкатегории товара'


class Brand(models.Model):
  name = models.CharField(max_length=100, verbose_name='Название')
  image = models.ImageField(upload_to='brands/', verbose_name='Изображение')

  def __str__(self):
    return self.name

  class Meta:
    verbose_name = 'Бренд'
    verbose_name_plural = 'Бренды'

  
class Tag(models.Model):
  name = models.CharField(max_length=100, verbose_name='Название')
  color = models.CharField(max_length=7, verbose_name='Цвет')

  def __str__(self):
    return self.name

  class Meta:
    verbose_name = 'Тег'
    verbose_name_plural = 'Теги'


class Price(models.Model):
  actual_price = models.PositiveIntegerField(verbose_name='Цена без скидки')
  sale_price = models.PositiveIntegerField(null=True, blank=True, verbose_name='Цена со скидкой')
  percentage = models.DecimalField(
    max_digits=3,
    decimal_places=0,
    validators=PERCENTAGE_VALIDATOR,
    null=True,
    blank=True,
    verbose_name='Процент скидки',
  )

  def get_price(self):
    if self.sale_price:
      return self.sale_price
    return self.actual_price

  def __str__(self):
    return f'{self.actual_price}, {self.variant}'

  class Meta:
    verbose_name = 'Цена на товар'
    verbose_name_plural = 'Цены на товар'


class Product(models.Model):
  name = models.CharField(max_length=100, verbose_name='Название')
  description = models.TextField(verbose_name='Описание')
  image = models.ImageField(upload_to='products/', verbose_name='Изображение')
  subcategory = models.ForeignKey(Subcategory, on_delete=models.CASCADE, verbose_name='Подкатегория')
  tags = models.ManyToManyField(Tag, blank=True, verbose_name='Теги')
  brand = models.ForeignKey(Brand, on_delete=models.CASCADE, verbose_name='Бренд')
  silimar_products = models.ManyToManyField(
    'self',
    related_name='product_silimar_products',
    symmetrical=False,
    blank=True,
    verbose_name='Похожие товары'
  )
  bought_together_products = models.ManyToManyField(
    'self',
    related_name='product_bought_together_products',
    symmetrical=False,
    blank=True,
    verbose_name='Товары, покупаемые с вместе этим'
  )

  @property
  def reviews(self):
    return Review.objects.filter(variant__in=self.variants.all())

  @property
  def avg_rating(self):
    raw = self.reviews.all().aggregate(Avg('rating'))['rating__avg'] or 0
    return round(raw, 1)

  def __str__(self):
    return self.name

  class Meta:
    verbose_name = 'Товар'
    verbose_name_plural = 'Товары'


class Variant(models.Model):
  name = models.CharField(max_length=100, verbose_name='Название')
  price = models.OneToOneField(
    Price,
    on_delete=models.CASCADE,
    related_name='variant',
    primary_key=True, 
    verbose_name='Цена'
  )
  product = models.ForeignKey(
    Product,
    on_delete=models.CASCADE,
    related_name='variants',
    verbose_name='Товар'
  )

  def __str__(self):
    return f'{self.name}, {self.product}'

  class Meta:
    verbose_name = 'Вариант товара'
    verbose_name_plural = 'Варианты товара'

  
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
  email = models.EmailField(max_length=40, unique=True, verbose_name='Электронная почта')
  first_name = models.CharField(max_length=30, blank=True, verbose_name='Имя')
  last_name = models.CharField(max_length=30, blank=True, verbose_name='Фамилия')
  patronymic = models.CharField(max_length=100, null=True, blank=True, verbose_name='Отчество')
  birthdate = models.DateField(null=True, blank=True, verbose_name='Дата рождения')
  image = models.ImageField(null=True, blank=True, upload_to='users/', verbose_name='Изображение')
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

  objects = UserManager()

  USERNAME_FIELD = 'email'
  REQUIRED_FIELDS = ['first_name', 'last_name']

  def get_fullname(self):
    return f'{self.first_name} {self.last_name}'

  def save(self, *args, **kwargs):
    super(User, self).save(*args, **kwargs)
    return self

  def __str__(self):
    return self.get_fullname()

  class Meta:
    verbose_name = 'Пользователь'
    verbose_name_plural = 'Пользователи'


class CartItem(models.Model):
  variant = models.ForeignKey(Variant, on_delete=models.CASCADE, verbose_name='Вариант товара')
  user = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name='Пользователь')
  amount = models.IntegerField(default=1, verbose_name='Количество')
  created_at = models.DateTimeField(auto_now_add=True, verbose_name='Дата и время создания')

  def __str__(self):
    return f'{self.variant.product.name}, {self.amount} шт., {self.user}'

  class Meta:
    verbose_name = 'Объект корзины'
    verbose_name_plural = 'Объекты корзины'


class Review(models.Model):
  user = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name='Автор отзыва')
  variant = models.ForeignKey(Variant, on_delete=models.CASCADE, blank=True, null=True, verbose_name='Вариант')
  created_at = models.DateTimeField(auto_now_add=True, verbose_name='Дата и время создания')
  text = models.TextField(verbose_name='Текст')
  rating = models.PositiveSmallIntegerField(
    validators=RATING_VALIDATOR,
    verbose_name='Рейтинг',
  )

  def get_votes(self):
    total = self.votes.all().count()
    positive = self.votes.filter(is_positive=True).count()
    negative = total - positive

    return positive, negative

  @property
  def votes_count(self):
    positive, negative = self.get_votes()
    return positive - negative

  def __str__(self):
    created_at = format_datetime(self.created_at)
    return f'{self.variant.product}, {self.user}, {created_at}'

  class Meta:
    verbose_name = 'Отзыв на товар'
    verbose_name_plural = 'Отзывы на товар'

  
class Vote(models.Model):
  is_positive = models.BooleanField(verbose_name='Положительный ли голос')
  user = models.ForeignKey(
    User,
    related_name='votes',
    on_delete=models.CASCADE,
    verbose_name='Проголосовавший'
  )
  review = models.ForeignKey(
    Review,
    related_name='votes',
    on_delete=models.CASCADE,
    verbose_name='Отзыв'
  )

  def __str__(self):
    return f'Отзыв: {self.review}, Пользователь: {self.user}'

  class Meta:
    verbose_name = 'Голос за отзыв'
    verbose_name_plural = 'Голоса за отзыв'


class Order(models.Model):
  is_active = models.BooleanField(default=True, verbose_name='Активен ли заказ')
  user = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name='Пользователь')
  created_at = models.DateTimeField(auto_now_add=True, verbose_name='Дата и время создания')
  approx_delivery_date = models.DateField(blank=True, null=True, verbose_name='Примерная дата доставки')

  def __str__(self):
    created_at = format_datetime(self.created_at)
    return f'{self.user}, {created_at}'

  class Meta:
    verbose_name = 'Заказ'
    verbose_name_plural = 'Заказы'
    ordering = ('-created_at',)


class OrderedProduct(models.Model):
  order = models.ForeignKey(Order, related_name='products', on_delete=models.CASCADE, verbose_name='Заказ')
  variant = models.ForeignKey(Variant, on_delete=models.CASCADE, verbose_name='Вариант товара')
  amount = models.IntegerField(default=1, verbose_name='Количество')

  def __str__(self):  
    return f'{self.variant.product.name}, {self.order}'

  class Meta:
    verbose_name = 'Заказанный товар'
    verbose_name_plural = 'Заказанные товары'


class OrderStageType(models.Model):
  name = models.CharField(max_length=100, verbose_name='Название')
  ordering = models.PositiveSmallIntegerField(verbose_name='Порядковый номер этапа')

  def __str__(self):
    return self.name
  
  class Meta:
    verbose_name = 'Тип этапа заказа'
    verbose_name_plural = 'Типы этапа заказа'


class OrderStage(models.Model):
  order = models.ForeignKey(Order, related_name='stages', on_delete=models.CASCADE, verbose_name='Заказ')
  is_done = models.BooleanField(default=False, verbose_name='Выполнен ли')
  stage_type = models.ForeignKey(OrderStageType, on_delete=models.CASCADE, verbose_name='Тип этапа')
  modified_at = models.DateTimeField(auto_now=True, verbose_name='Время изменения')

  def __str__(self):
    return f'{self.order}, {self.stage_type.name}'

  class Meta:
    verbose_name = 'Этап заказа'
    verbose_name_plural = 'Этапы заказа'
    ordering = ('stage_type__ordering',)
