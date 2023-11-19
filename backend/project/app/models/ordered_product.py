from django.db import models
from app.validators import AMOUNT_VALIDATOR
from .order import Order
from .variant import Variant

def get_upload_path(instance, filename):
  return os.path.join(
    'orders',
    str(instance.id),
    filename
  )


class OrderedProduct(models.Model):
  order = models.ForeignKey(Order, related_name='products', on_delete=models.CASCADE, verbose_name='Заказ')
  amount = models.IntegerField(default=1, validators=AMOUNT_VALIDATOR, verbose_name='Количество')
  origin_variant = models.ForeignKey(Variant, null=True, on_delete=models.SET_NULL, verbose_name='Ссылка')

  # Поля из Product/Variant, чтобы оставить товар в том состоянии,
  # в котором он был оформлен.
  name = models.CharField(max_length=150, verbose_name='Название')
  image = models.ImageField(upload_to=get_upload_path, verbose_name='Изображение')
  actual_price = models.PositiveIntegerField(verbose_name='Цена без скидки')
  sale_price = models.PositiveIntegerField(null=True, blank=True, verbose_name='Цена со скидкой')
  variant_name = models.CharField(max_length=100, verbose_name='Вариант')

  def __str__(self):  
    return f'{self.name}, {self.order}'

  class Meta:
    verbose_name = 'Заказанный товар'
    verbose_name_plural = 'Заказанные товары'
