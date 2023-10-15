from django.contrib import admin
from app.models import OrderStageType


@admin.register(OrderStageType)
class OrderStageTypeAdmin(admin.ModelAdmin):
  list_display = ('name',)
