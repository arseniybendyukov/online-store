from django.db import models
from django.contrib.auth.models import AbstractUser
from .validators import PERCENTAGE_VALIDATOR, RATING_VALIDATOR, PHONE_NUMBER_VALIDATOR


class Category(models.Model):
  name = models.CharField(max_length=100, verbose_name='Название')

  class Meta:
    verbose_name = 'Категория товара'
    verbose_name_plural = 'Категории товара'


class Subcategory(models.Model):
  name = models.CharField(max_length=100, verbose_name='Название')
  category = models.ForeignKey(Category, on_delete=models.CASCADE, verbose_name='Категория')

  class Meta:
    verbose_name = 'Подкатегория товара'
    verbose_name_plural = 'Подкатегории товара'


class Brand(models.Model):
  name = models.CharField(max_length=100, verbose_name='Название')
  image = models.ImageField(upload_to='brands/', verbose_name='Изображение')

  class Meta:
    verbose_name = 'Бренд'
    verbose_name_plural = 'Бренды'

  
class Tag(models.Model):
  name = models.CharField(max_length=100, verbose_name='Название')
  color = models.CharField(max_length=7, verbose_name='Цвет')

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

  class Meta:
      verbose_name = 'Цена на товар'
      verbose_name_plural = 'Цены на товар'


class Product(models.Model):
  name = models.CharField(max_length=100, verbose_name='Название')
  description = models.TextField(verbose_name='Описание')
  image = models.ImageField(upload_to='products/', verbose_name='Изображение')
  subcategory = models.ForeignKey(Subcategory, on_delete=models.CASCADE, verbose_name='Подкатегория')
  tags = models.ManyToManyField(Tag, blank=True, verbose_name='Теги')
  silimar_products = models.ManyToManyField('self', blank=True, verbose_name='Похожие товары')
  bought_together_products = models.ManyToManyField('self', blank=True, verbose_name='Товары, покупаемые с вместе этим')

  class Meta:
    verbose_name = 'Товар'
    verbose_name_plural = 'Товары'


class Variant(models.Model):
  name = models.CharField(max_length=100, verbose_name='Название')
  product = models.ForeignKey(Product, on_delete=models.CASCADE, verbose_name='Товар')
  price = models.OneToOneField(Price, on_delete=models.CASCADE, primary_key=True, verbose_name='Цена')

  class Meta:
    verbose_name = 'Вариант товара'
    verbose_name_plural = 'Варианты товара'
    

class User(AbstractUser):
  image = models.ImageField(null=True, blank=True, upload_to='users/', verbose_name='Изображение')
  patronymic = models.CharField(max_length=100, null=True, blank=True, verbose_name='Отчество')
  birthdate = models.DateField(null=True, blank=True, verbose_name='Дата рождения')
  phone_number = models.CharField(
    max_length=17,
    validators=[PHONE_NUMBER_VALIDATOR],
    null=True,
    blank=True,
    verbose_name='Номер телефона',
  )
  saved_products = models.ManyToManyField(Product, blank=True, verbose_name='Сохраненные товары')

  def __str__(self):
    return self.username

  class Meta:
    verbose_name = 'Пользователь'
    verbose_name_plural = 'Пользователи'

  
class CartItem(models.Model):
  product = models.ForeignKey(Product, on_delete=models.CASCADE, verbose_name='Товар')
  user = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name='Пользователь')
  amount = models.IntegerField(default=1, verbose_name='Количество')

  class Meta:
    verbose_name = 'Объект корзины'
    verbose_name_plural = 'Объекты корзины'


class Review(models.Model):
  user = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name='Пользователь')
  product = models.ForeignKey(Product, on_delete=models.CASCADE, verbose_name='Товар')
  variant = models.ForeignKey(Variant, on_delete=models.CASCADE, blank=True, null=True, verbose_name='Вариант')
  created_at = models.DateTimeField(auto_now_add=True, verbose_name='Дата и время создания')
  text = models.TextField(verbose_name='Текст')
  votes = models.IntegerField(default=0, verbose_name='Число голосов')
  rating = models.DecimalField(
    max_digits=1,
    decimal_places=0,
    validators=RATING_VALIDATOR,
    verbose_name='Рейтинг',
  )

  class Meta:
    verbose_name = 'Отзыв на товар'
    verbose_name_plural = 'Отзывы на товар'


class Order(models.Model):
  code = models.IntegerField(verbose_name='Код')
  user = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name='Пользователь')
  created_at = models.DateTimeField(auto_now_add=True, verbose_name='Дата и время создания')

  class Meta:
    verbose_name = 'Заказ'
    verbose_name_plural = 'Заказы'


class OrderedProduct(models.Model):
  order = models.ForeignKey(Order, on_delete=models.CASCADE, verbose_name='Заказ')
  product = models.ForeignKey(Product, on_delete=models.CASCADE, verbose_name='Товар')
  amount = models.IntegerField(default=1, verbose_name='Количество')

  class Meta:
    verbose_name = 'Заказанный товар'
    verbose_name_plural = 'Заказанные товары'
