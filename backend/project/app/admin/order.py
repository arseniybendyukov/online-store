from django.contrib import admin
from app.utils import format_datetime
from app.forms import OrderStageFormSet
from app.models import Order, OrderStage


class OrderStageInline(admin.TabularInline):
  model = OrderStage
  readonly_fields = ('stage_type',)
  formset = OrderStageFormSet
  extra = 0

  def has_add_permission(self, request, instance=None):
    return False

  def has_delete_permission(self, request, instance=None):
    return False


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
  inlines = [OrderStageInline]
  list_display = (
    'user',
    'formatted_created_at',
  )

  @admin.display(description='Дата и время заказа')
  def formatted_created_at(self, instance):
    return format_datetime(instance.created_at)
