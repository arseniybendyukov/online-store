from django.db import models
from app.validators import PERCENTAGE_VALIDATOR


class Price(models.Model):
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

  def get_price(self):
    if self.sale_price:
      return self.sale_price
    return self.actual_price

  def __str__(self):
    return f'{self.actual_price}, {self.variant}'

  class Meta:
    verbose_name = 'Цена на товар'
    verbose_name_plural = 'Цены на товар'
