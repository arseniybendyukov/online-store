from django.db import models
import os
from app.validators import PERCENTAGE_VALIDATOR
from .product import Product


def get_upload_path(instance, filename):
  return os.path.join(
    'variants',
    str(instance.product.id),
    filename
  )


class Variant(models.Model):
  image = models.ImageField(upload_to=get_upload_path, verbose_name='Изображение')
  name = models.CharField(max_length=100, verbose_name='Название')
  is_in_stock = models.BooleanField(default=True, verbose_name='Есть ли в наличии')
  actual_price = models.PositiveIntegerField(verbose_name='Цена без скидки')
  sale_price = models.PositiveIntegerField(null=True, blank=True, verbose_name='Цена со скидкой')
  weight = models.PositiveSmallIntegerField(default=1, verbose_name='Вес (гр)')
  width = models.PositiveSmallIntegerField(default=1, verbose_name='Ширина (см)')
  height = models.PositiveSmallIntegerField(default=1, verbose_name='Высота (см)')
  length = models.PositiveSmallIntegerField(default=1, verbose_name='Длина (см)')
  percentage = models.DecimalField(
    max_digits=3,
    decimal_places=0,
    validators=PERCENTAGE_VALIDATOR,
    null=True,
    blank=True,
    verbose_name='Процент скидки',
  )
  product = models.ForeignKey(
    Product,
    on_delete=models.CASCADE,
    related_name='variants',
    verbose_name='Товар'
  )
  ordering = models.PositiveSmallIntegerField(
    default=0,
    blank=False,
    null=False,
    verbose_name='Порядок',
  )

  def get_price(self):
    return self.sale_price or self.actual_price

  def __str__(self):
    return f'{self.name}, {self.product}'

  class Meta:
    verbose_name = 'Вариант товара'
    verbose_name_plural = 'Варианты товара'
    ordering = ('ordering',)
