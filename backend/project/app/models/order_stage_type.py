from django.db import models


class OrderStageType(models.Model):
  name = models.CharField(max_length=100, verbose_name='Название')
  ordering = models.PositiveSmallIntegerField(verbose_name='Порядковый номер этапа')

  def __str__(self):
    return self.name
  
  class Meta:
    verbose_name = 'Тип этапа заказа'
    verbose_name_plural = 'Типы этапа заказа'
