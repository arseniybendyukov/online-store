from django.db import models


class CommonTag(models.Model):
  name = models.CharField(max_length=100, verbose_name='Название')
  color = models.CharField(max_length=7, verbose_name='Цвет')

  def __str__(self):
    return self.name

  class Meta:
    abstract = True


class ProductTag(CommonTag):
  class Meta:
    verbose_name = 'Тег продукта'
    verbose_name_plural = 'Теги продукта'

  
class BlogTag(CommonTag):
  class Meta:
    verbose_name = 'Тег блога'
    verbose_name_plural = 'Теги блога'
