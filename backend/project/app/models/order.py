from django.db import models
from app.utils import format_datetime
from .user import User
from .promocode import Promocode


class Order(models.Model):
  user = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name='Пользователь')
  created_at = models.DateTimeField(auto_now_add=True, verbose_name='Дата и время создания')
  approx_delivery_date = models.DateField(blank=True, null=True, verbose_name='Примерная дата доставки')
  is_cancelled = models.BooleanField(default=False, verbose_name='Отменен ли')
  address = models.CharField(max_length=256, blank=True, null=True, verbose_name='Адрес')
  delivery_sum = models.PositiveIntegerField(blank=True, null=True, verbose_name='Стоимость доставки')
  tariff = models.CharField(max_length=256, blank=True, null=True, verbose_name='Тариф')
  promocode = models.ForeignKey(
    Promocode,
    null=True,
    blank=True,
    on_delete=models.SET_NULL,
    verbose_name='Промокод',
  )
  is_pickup = models.BooleanField(default=False, verbose_name='Самовывоз ли')

  @property 
  def is_active(self):
    if self.is_cancelled:
      return False
    done_stages = self.stages.filter(is_done=True)
    return done_stages.count() != self.stages.count()

  def __str__(self):
    created_at = format_datetime(self.created_at)
    return f'{self.user}, {created_at}'

  class Meta:
    verbose_name = 'Заказ'
    verbose_name_plural = 'Заказы'
    ordering = ('-created_at',)
