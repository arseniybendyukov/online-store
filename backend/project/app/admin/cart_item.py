from django.contrib import admin
from app.models import CartItem


@admin.register(CartItem)
class CartItemAdmin(admin.ModelAdmin):
  list_display = (
    'product',
    'amount',
    'user', 
  )

  @admin.display(description='Товар')
  def product(self, instance):
    return instance.variant.product
