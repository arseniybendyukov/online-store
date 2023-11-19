from django.contrib import admin
from django.db.models import F, Q, Count, Case, When, Value, BooleanField
from app.forms import OrderStageFormSet
from app.models import Order, OrderStage, OrderedProduct
from django.utils.html import format_html
from app.utils import format_datetime


class OrderStageInline(admin.TabularInline):
  model = OrderStage
  readonly_fields = ('stage_type',)
  formset = OrderStageFormSet
  extra = 0

  def has_add_permission(self, request, instance=None):
    return False

  def has_delete_permission(self, request, instance=None):
    return False



class OrderedProductInline(admin.TabularInline):
  model = OrderedProduct
  extra = 0
  fields = (
    'name',
    'variant_name',
    'amount',
    'origin_variant',
    'actual_price',
    'sale_price',
    'is_in_stock',
  )
  readonly_fields = (
    'name',
    'variant_name',
    'amount',
    'origin_variant',
    'actual_price',
    'sale_price',
    'is_in_stock',
  )

  @admin.display(description='Есть ли в наличии', boolean=True)
  def is_in_stock(self, instance):
    if instance.origin_variant:
      return instance.origin_variant.is_in_stock
    return False

  def has_add_permission(self, request, instance=None):
    return False

  def has_delete_permission(self, request, instance=None):
    return False


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
  inlines = [OrderedProductInline, OrderStageInline]
  list_display = (
    'user',
    'formatted_created_at',
    'is_active',
  )

  # todo: @property (is_active) не может использоваться в lookup,
  # поэтому пришлось переписать его получение через запросы
  def get_queryset(self, request):
    queryset = super().get_queryset(request)
    return queryset.annotate(
      stages_count=Count('stages'),
      done_stages_count=Count('stages', filter=Q(stages__is_done=True)),
    ).annotate(
        admin_is_active=Case(
        When(is_cancelled=True, then=Value(False)),
        When(stages_count=F('done_stages_count'), then=Value(False)),
        default=Value(True),
        output_field=BooleanField(),
      )
    )

  @admin.display(description='Дата и время заказа')
  def formatted_created_at(self, instance):
    return format_datetime(instance.created_at)
  formatted_created_at.admin_order_field = 'created_at'

  @admin.display(description='Активен ли заказ', boolean=True)
  def is_active(self, instance):
    return instance.is_active
  is_active.admin_order_field = 'admin_is_active'
