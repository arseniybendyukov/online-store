from django.contrib import admin
from adminsortable2.admin import SortableAdminMixin
from app.models import OrderStageType


@admin.register(OrderStageType)
class OrderStageTypeAdmin(SortableAdminMixin, admin.ModelAdmin):
  ordering = ('ordering',)
  list_display = (
    'ordering',
    'name',
    'is_payment_stage',
  )
