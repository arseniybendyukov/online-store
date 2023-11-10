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
  product = models.ForeignKey(
    Product,
    on_delete=models.CASCADE,
    related_name='variants',
    verbose_name='Товар'
  )

  def get_price(self):
    if self.sale_price:
      return self.sale_price
    return self.actual_price

  def __str__(self):
    return f'{self.name}, {self.product}'

  class Meta:
    verbose_name = 'Вариант товара'
    verbose_name_plural = 'Варианты товара'
