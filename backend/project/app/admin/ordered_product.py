from django.contrib import admin
from app.utils import crop_text, format_datetime
from app.models import OrderedProduct


@admin.register(OrderedProduct)
class OrderedProductAdmin(admin.ModelAdmin):
  list_display = (
    'product',
    'amount',
    'user',
    'ordered_at',
  )

  @admin.display(description='Пользователь')
  def user(self, instance):
    return instance.order.user

  @admin.display(description='Товар')
  def product(self, instance):
    return instance.variant.product

  @admin.display(description='Дата и время заказа')
  def ordered_at(self, instance):
    return format_datetime(instance.order.created_at)
