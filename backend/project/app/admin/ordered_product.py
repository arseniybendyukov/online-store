from django.contrib import admin
from app.utils import crop_text, format_datetime
from app.models import OrderedProduct


@admin.register(OrderedProduct)
class OrderedProductAdmin(admin.ModelAdmin):
  list_display = (
    'name',
    'amount',
    'user',
    'ordered_at',
  )

  @admin.display(description='Пользователь')
  def user(self, instance):
    return instance.order.user
  user.admin_order_field = 'order__user__first_name'

  @admin.display(description='Дата и время заказа')
  def ordered_at(self, instance):
    return format_datetime(instance.order.created_at)
  ordered_at.admin_order_field = 'order__created_at'
