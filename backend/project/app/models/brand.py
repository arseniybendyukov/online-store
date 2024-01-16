from django.db import models
from .manufacturer_country import ManufacturerCountry


class Brand(models.Model):
  name = models.CharField(max_length=100, verbose_name='Название')
  image = models.ImageField(
    upload_to='brands/',
    null=True,
    blank=True,
    verbose_name='Изображение'
  )
  manufacturer_country = models.ForeignKey(
    ManufacturerCountry,
    on_delete=models.SET_NULL,
    blank=True,
    null=True,
    verbose_name='Страна производитель',
  )

  def __str__(self):
    return self.name

  class Meta:
    verbose_name = 'Бренд'
    verbose_name_plural = 'Бренды'
