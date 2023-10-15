from django.db import models
from app.utils import format_datetime
from app.validators import RATING_VALIDATOR
from .user import User
from .variant import Variant


class Review(models.Model):
  user = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name='Автор отзыва')
  variant = models.ForeignKey(Variant, on_delete=models.CASCADE, blank=True, null=True, verbose_name='Вариант')
  created_at = models.DateTimeField(auto_now_add=True, verbose_name='Дата и время создания')
  text = models.TextField(verbose_name='Текст')
  rating = models.PositiveSmallIntegerField(
    validators=RATING_VALIDATOR,
    verbose_name='Рейтинг',
  )

  def get_votes(self):
    total = self.votes.all().count()
    positive = self.votes.filter(is_positive=True).count()
    negative = total - positive

    return positive, negative

  @property
  def votes_count(self):
    positive, negative = self.get_votes()
    return positive - negative

  def __str__(self):
    created_at = format_datetime(self.created_at)
    return f'{self.variant.product}, {self.user}, {created_at}'

  class Meta:
    verbose_name = 'Отзыв на товар'
    verbose_name_plural = 'Отзывы на товар'