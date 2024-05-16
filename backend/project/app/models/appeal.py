from django.db import models
from app.validators import PHONE_NUMBER_VALIDATOR
from app.utils import format_datetime


class Appeal(models.Model):
  full_name = models.CharField(max_length=100, verbose_name='Полное имя')
  phone_number = models.CharField(
    max_length=17,
    validators=[PHONE_NUMBER_VALIDATOR],
    verbose_name='Номер телефона',
  )
  text = models.TextField()
  created_at = models.DateTimeField(auto_now_add=True, verbose_name='Дата и время создания')

  def __str__(self):
    created_at = format_datetime(self.created_at)
    return f'{self.full_name}, {self.phone_number}, {created_at}'

  class Meta:
    verbose_name = 'Обращение по форме'
    verbose_name_plural = 'Обращения по форме'
