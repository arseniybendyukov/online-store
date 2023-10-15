from django.db import models
from .user import User
from .review import Review


class Vote(models.Model):
  is_positive = models.BooleanField(verbose_name='Положительный ли голос')
  user = models.ForeignKey(
    User,
    related_name='votes',
    on_delete=models.CASCADE,
    verbose_name='Проголосовавший'
  )
  review = models.ForeignKey(
    Review,
    related_name='votes',
    on_delete=models.CASCADE,
    verbose_name='Отзыв'
  )

  def __str__(self):
    return f'Отзыв: {self.review}, Пользователь: {self.user}'

  class Meta:
    verbose_name = 'Голос за отзыв'
    verbose_name_plural = 'Голоса за отзыв'
