from django.contrib import admin
from app.utils import to_price
from app.models import Variant


@admin.register(Variant)
class VariantAdmin(admin.ModelAdmin):
  list_display = ('product', 'name', 'actual_price',)

  @admin.display(description='Цена')
  def actual_price(self, instance):
    return to_price(instance.actual_price)
