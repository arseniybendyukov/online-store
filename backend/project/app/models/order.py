from django.db import models
from app.utils import format_datetime
from .user import User


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
