from django.db import models
from .price import Price
from .product import Product


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
