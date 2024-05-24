from django.db import models
from app.validators import PERCENTAGE_VALIDATOR


class Promocode(models.Model):
  name = models.CharField(max_length=32, unique=True, verbose_name='Название')
  percentage = models.DecimalField(
    max_digits=3,
    decimal_places=0,
    validators=PERCENTAGE_VALIDATOR,
    verbose_name='Процент скидки',
  )
  is_active = models.BooleanField(default=True, verbose_name='Активен ли')

  def __str__(self):
    return self.name

  class Meta:
    verbose_name = 'Промокод'
    verbose_name_plural = 'Промокоды'
