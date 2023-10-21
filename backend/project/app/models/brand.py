from django.db import models


class Brand(models.Model):
  name = models.CharField(max_length=100, verbose_name='Название')
  image = models.ImageField(upload_to='brands/', verbose_name='Изображение')

  def __str__(self):
    return self.name

  class Meta:
    verbose_name = 'Бренд'
    verbose_name_plural = 'Бренды'
