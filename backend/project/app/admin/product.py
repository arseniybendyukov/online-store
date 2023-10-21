from django.contrib import admin
from app.models import Product, Variant


class VariantInline(admin.TabularInline):
  model = Variant
  extra = 1

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
  inlines = [VariantInline]
  list_display = (
    'name',
    'brand',
    'subcategory',
    'category',
    'rating',
  )

  @admin.display(description='Среднестатистический рейтинг')
  def rating(self, instance):
    return instance.avg_rating

  @admin.display(description='Категория')
  def category(self, instance):
    return instance.subcategory.category
