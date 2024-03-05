from django.contrib import admin
from adminsortable2.admin import SortableTabularInline, SortableAdminBase
from django.db.models import Avg, Count
from app.models import Product, Variant
from django.utils.html import format_html


class VariantInline(SortableTabularInline):
  model = Variant
  extra = 1


@admin.register(Product)
class ProductAdmin(SortableAdminBase, admin.ModelAdmin):
  inlines = [VariantInline]
  search_fields = ('name',)
  filter_horizontal = (
    'silimar_products',
    'bought_together_products',
  )
  list_display = (
    'name',
    'brand',
    'categories_chain',
    'rating',
    'variants_in_stock',
  )

  # TODO: @property (avg_rating) не может использоваться в lookup,
  # поэтому пришлось переписать его получение через запросы
  def get_queryset(self, request):
    queryset = super().get_queryset(request)
    return queryset.annotate(
      rating=Avg('variants__reviews__rating'),
      variants_count=Count('variants'),
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
  rating.admin_order_field = 'rating'

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
  variants_in_stock.admin_order_field = 'variants_count'
