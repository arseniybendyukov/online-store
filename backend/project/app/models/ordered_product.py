from django.db import models
from app.validators import AMOUNT_VALIDATOR
from .order import Order
from .variant import Variant


class OrderedProduct(models.Model):
  order = models.ForeignKey(Order, related_name='products', on_delete=models.CASCADE, verbose_name='Заказ')
  variant = models.ForeignKey(Variant, on_delete=models.CASCADE, verbose_name='Вариант товара')
  amount = models.IntegerField(default=1, validators=AMOUNT_VALIDATOR, verbose_name='Количество')

  def __str__(self):  
    return f'{self.variant.product.name}, {self.order}'

  class Meta:
    verbose_name = 'Заказанный товар'
    verbose_name_plural = 'Заказанные товары'
