from django.db import models
from django.db.models.constraints import UniqueConstraint
from django.db.models import Q


class OrderStageType(models.Model):
  name = models.CharField(max_length=100, verbose_name='Название')
  description = models.TextField(verbose_name='Описание')
  ordering = models.PositiveSmallIntegerField(
    default=0,
    blank=False,
    null=False,
    verbose_name='Порядок',
  )
  is_payment_stage = models.BooleanField(
    default=False,
    verbose_name='Является ли этапом оплаты',
  )

  def __str__(self):
    return self.name
  
  class Meta:
    verbose_name = 'Тип этапа заказа'
    verbose_name_plural = 'Типы этапа заказа'
    ordering = ('ordering',)
    constraints = (
      UniqueConstraint(
        fields=['is_payment_stage'],
        condition=Q(is_payment_stage=True),
        name='unique_is_payment_stage'
      ),
    )
