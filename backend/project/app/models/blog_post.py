from django.db import models
from .tags import BlogTag


class BlogPost(models.Model):
  image = models.ImageField(upload_to='blog/', verbose_name='Изображение')
  heading = models.CharField(max_length=200, verbose_name='Заголовок')
  description = models.CharField(max_length=200, verbose_name=' Описание')
  text = models.TextField()
  tags = models.ManyToManyField(BlogTag, blank=True, verbose_name='Теги')
  created_at = models.DateField(auto_now_add=True, verbose_name='Дата создания')

  def __str__(self):
    return f'{self.created_at}, {self.heading}'
  
  class Meta:
    verbose_name = 'Пост в блоге'
    verbose_name_plural = 'Посты в блоге'
