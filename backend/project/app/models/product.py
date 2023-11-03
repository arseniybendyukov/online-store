from django.db import models
from django.db.models import Avg
from django.apps import apps
from .subcategory import Subcategory
from .tags import ProductTag
from .brand import Brand


class Product(models.Model):
  name = models.CharField(max_length=100, verbose_name='Название')
  description = models.TextField(verbose_name='Описание')
  image = models.ImageField(upload_to='products/', verbose_name='Изображение')
  subcategory = models.ForeignKey(Subcategory, on_delete=models.CASCADE, verbose_name='Подкатегория')
  tags = models.ManyToManyField(ProductTag, blank=True, verbose_name='Теги')
  brand = models.ForeignKey(Brand, on_delete=models.CASCADE, verbose_name='Бренд')
  silimar_products = models.ManyToManyField(
    'self',
    related_name='product_silimar_products',
    symmetrical=False,
    blank=True,
    verbose_name='Похожие товары'
  )
  bought_together_products = models.ManyToManyField(
    'self',
    related_name='product_bought_together_products',
    symmetrical=False,
    blank=True,
    verbose_name='Товары, покупаемые с вместе этим'
  )

  @property
  def render_name(self):
    return f'{self.subcategory}, {self.name}, {self.brand.name}'

  @property
  def reviews(self):
    return apps.get_model('app.Review').objects.filter(variant__in=self.variants.all())

  @property
  def avg_rating(self):
    raw = self.reviews.all().aggregate(Avg('rating'))['rating__avg'] or 0
    return round(raw, 1)

  def __str__(self):
    return self.name

  class Meta:
    verbose_name = 'Товар'
    verbose_name_plural = 'Товары'
