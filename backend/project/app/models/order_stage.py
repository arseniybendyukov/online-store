from django.db import models
from .order import Order
from .order_stage_type import OrderStageType


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
