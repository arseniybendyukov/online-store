from django.db import models
from itertools import chain


class Category(models.Model):
  name = models.CharField(max_length=100, verbose_name='Название')
  parent = models.ForeignKey('self', blank=True, null=True, related_name='children', on_delete=models.SET_NULL)

  def get_all_parents(self):
    if self.parent:
      return [self.parent, *self.parent.get_all_parents()]
    return []


  def get_all_children(self):
    if self.children.all().count() > 0:
      return [
        *self.children.all(),
        *list(chain.from_iterable(
          [child.get_all_children() for child in self.children.all()]
        ))
      ]
    return []


  def __str__(self):
    return self.name

  class Meta:
    verbose_name = 'Категория товара'
    verbose_name_plural = 'Категории товара'
