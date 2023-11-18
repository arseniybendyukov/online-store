from django.contrib import admin
from app.models import Product, Variant
from django.utils.html import format_html


class VariantInline(admin.TabularInline):
  model = Variant
  extra = 1


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
  inlines = [VariantInline]
  list_display = (
    'name',
    'brand',
    'categories_chain',
    'rating',
    'variants_in_stock',
  )

  @admin.display(description='Категория')
  def categories_chain(self, instance):
    return ' → '.join([
      *(map(
        lambda category: category.name,
        reversed(instance.category.get_all_parents())
      )),
      instance.category.name
    ])

  @admin.display(description='Ср. рейтинг')
  def rating(self, instance):
    return instance.avg_rating

  @admin.display(description='Вариантов в наличии')
  def variants_in_stock(self, instance):
    variants_total_count = instance.variants.count()
    variants_in_stock_count = instance.variants.filter(is_in_stock=True).count()

    color = 'red' if variants_in_stock_count == 0 else 'green'

    return format_html(
      '<span style="color: {};">{} / {}</span>',
      color,
      variants_in_stock_count,
      variants_total_count,
    )
