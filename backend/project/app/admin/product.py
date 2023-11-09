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
    'categories_chain',
    'rating',
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

  @admin.display(description='Среднестатистический рейтинг')
  def rating(self, instance):
    return instance.avg_rating
