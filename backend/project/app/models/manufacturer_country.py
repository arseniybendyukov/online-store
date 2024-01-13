from django.db import models


class ManufacturerCountry(models.Model):
  name = models.CharField(max_length=100, verbose_name='Название')

  def __str__(self):
    return self.name

  class Meta:
    verbose_name = 'Страна производитель'
    verbose_name_plural = 'Страны производители'
