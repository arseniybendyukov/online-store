from django.db import models
from .category import Category

class Subcategory(models.Model):
  name = models.CharField(max_length=100, verbose_name='Название')
  category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='subcategories', verbose_name='Категория')

  def __str__(self):
    return self.name

  class Meta:
    verbose_name = 'Подкатегория товара'
    verbose_name_plural = 'Подкатегории товара'
