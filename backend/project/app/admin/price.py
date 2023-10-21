from django.contrib import admin
from app.models import Price


@admin.register(Price)
class PriceAdmin(admin.ModelAdmin):
  list_display = (
    'product',
    'variant_name',
    'actual_price',
    'sale_price',
    'percentage',
  )
  list_editable = (
    'actual_price',
    'sale_price',
    'percentage',
  )

  @admin.display(description='Товар')
  def product(self, instance):
    return instance.variant.product

  @admin.display(description='Вариант товара')
  def variant_name(self, instance):
    return instance.variant.name
