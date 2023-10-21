from django.contrib import admin
from app.utils import format_datetime
from app.models import OrderStage


@admin.register(OrderStage)
class OrderStageAdmin(admin.ModelAdmin):
  list_display = (
    'user',
    'created_at',
    'stage_type',
    'is_done',
    'modified_at',
  )
  list_editable = (
    'is_done',
  )

  @admin.display(description='Пользователь')
  def user(self, instance):
    return instance.order.user

  @admin.display(description='Дата создания заказа')
  def created_at(self, instance):
    return format_datetime(instance.order.created_at)
