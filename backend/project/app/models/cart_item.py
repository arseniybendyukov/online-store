from django.db import models
from app.validators import AMOUNT_VALIDATOR
from .variant import Variant
from .user import User


class CartItem(models.Model):
  variant = models.ForeignKey(Variant, on_delete=models.CASCADE, verbose_name='Вариант товара')
  user = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name='Пользователь')
  amount = models.IntegerField(default=1, validators=AMOUNT_VALIDATOR, verbose_name='Количество')
  created_at = models.DateTimeField(auto_now_add=True, verbose_name='Дата и время создания')

  def __str__(self):
    return f'{self.variant.product.name}, {self.amount} шт., {self.user}'

  class Meta:
    verbose_name = 'Объект корзины'
    verbose_name_plural = 'Объекты корзины'
