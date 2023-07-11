from django.db import models
from django.utils import timezone
from django.db import transaction
from django.db.models import Avg
from .validators import PERCENTAGE_VALIDATOR, RATING_VALIDATOR, PHONE_NUMBER_VALIDATOR
from django.contrib.auth.models import (
  AbstractBaseUser, PermissionsMixin, BaseUserManager
)


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
    return str(self.actual_price)

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
    return self.name

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
  """ 
  An abstract base class implementing a fully featured User model with 
  admin-compliant permissions. 
  """

  username = None
  email = models.EmailField(max_length=40, unique=True)
  first_name = models.CharField(max_length=30, blank=True)
  last_name = models.CharField(max_length=30, blank=True)
  image = models.ImageField(null=True, blank=True, upload_to='users/', verbose_name='Изображение')
  patronymic = models.CharField(max_length=100, null=True, blank=True, verbose_name='Отчество')
  birthdate = models.DateField(null=True, blank=True, verbose_name='Дата рождения')
  saved_products = models.ManyToManyField(Product, blank=True, verbose_name='Сохраненные товары')
  phone_number = models.CharField(
    max_length=17,
    validators=[PHONE_NUMBER_VALIDATOR],
    null=True,
    blank=True,
    verbose_name='Номер телефона',
  )

  is_active = models.BooleanField(default=True)
  is_staff = models.BooleanField(default=False)
  date_joined = models.DateTimeField(default=timezone.now)

  objects = UserManager()

  USERNAME_FIELD = 'email'
  REQUIRED_FIELDS = ['first_name', 'last_name']

  def save(self, *args, **kwargs):
    super(User, self).save(*args, **kwargs)
    return self

  def __str__(self):
    return f'{self.first_name} {self.last_name}'

  class Meta:
    verbose_name = 'Пользователь'
    verbose_name_plural = 'Пользователи'


class CartItem(models.Model):
  product = models.ForeignKey(Product, on_delete=models.CASCADE, verbose_name='Товар')
  user = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name='Пользователь')
  amount = models.IntegerField(default=1, verbose_name='Количество')

  def __str__(self):
    return f'{self.user.username}-{self.product.name}-{self.amount}'

  class Meta:
    verbose_name = 'Объект корзины'
    verbose_name_plural = 'Объекты корзины'


class Review(models.Model):
  user = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name='Пользователь')
  product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='reviews', verbose_name='Товар')
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
    return f'{self.user.username}-{self.product.name}-{self.created_at}'

  class Meta:
    verbose_name = 'Отзыв на товар'
    verbose_name_plural = 'Отзывы на товар'

  
class Vote(models.Model):
  is_positive = models.BooleanField(verbose_name='Положительный ли отзыв')
  user = models.ForeignKey(
    User,
    related_name='votes',
    on_delete=models.CASCADE,
    verbose_name='Пользователь'
  )
  review = models.ForeignKey(
    Review,
    related_name='votes',
    on_delete=models.CASCADE,
    verbose_name='Отзыв'
  )

  def __str__(self):
    return f'{self.user.username} → {self.review}'

  class Meta:
    verbose_name = 'Голос за отзыв'
    verbose_name_plural = 'Голоса за отзыв'


class Order(models.Model):
  code = models.IntegerField(verbose_name='Код')
  user = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name='Пользователь')
  created_at = models.DateTimeField(auto_now_add=True, verbose_name='Дата и время создания')

  def __str__(self):
    return f'{self.user.username}-{self.code}'

  class Meta:
    verbose_name = 'Заказ'
    verbose_name_plural = 'Заказы'


class OrderedProduct(models.Model):
  order = models.ForeignKey(Order, on_delete=models.CASCADE, verbose_name='Заказ')
  product = models.ForeignKey(Product, on_delete=models.CASCADE, verbose_name='Товар')
  amount = models.IntegerField(default=1, verbose_name='Количество')

  def __str__(self):
    return f'Заказ: {self.order.__str__()}, Продукт: {self.product.name}'

  class Meta:
    verbose_name = 'Заказанный товар'
    verbose_name_plural = 'Заказанные товары'
