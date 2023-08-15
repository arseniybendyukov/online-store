from django.contrib import admin
from .forms import TagForm, OrderStageFormSet
from .utils import format_datetime, crop_text, to_price
from .models import (
  Category,
  Subcategory,
  Brand,
  Tag,
  Price,
  Product,
  Variant,
  User,
  CartItem,
  Review,
  Order,
  OrderedProduct,
  Vote,
  OrderStage,
  OrderStageType,
)

admin.site.register(Brand)


@admin.register(Variant)
class VariantAdmin(admin.ModelAdmin):
  list_display = ('name', 'product', 'actual_price',)

  @admin.display(description='Цена')
  def actual_price(self, instance):
    return to_price(instance.price.actual_price)


@admin.register(Vote)
class VoteAdmin(admin.ModelAdmin):
  list_display = (
    'user',
    'is_positive',
    'product',
    'review_creator',
    'review_starts_with',
    'review_created_at',
  )

  @admin.display(description='Товар')
  def product(self, instance):
    return instance.review.variant.product
    
  @admin.display(description='Автор отзыва')
  def review_creator(self, instance):
    return instance.review.user
  
  @admin.display(description='Текст отзыва')
  def review_starts_with(self, instance):
    return crop_text(instance.review.text, 15)

  @admin.display(description='Дата создания отзыва')
  def review_created_at(self, instance):
    return format_datetime(instance.review.created_at)


@admin.register(OrderedProduct)
class OrderedProductAdmin(admin.ModelAdmin):
  list_display = (
    'product',
    'amount',
    'user',
    'ordered_at',
  )

  @admin.display(description='Пользователь')
  def user(self, instance):
    return instance.order.user

  @admin.display(description='Товар')
  def product(self, instance):
    return instance.variant.product

  @admin.display(description='Дата и время заказа')
  def ordered_at(self, instance):
    return format_datetime(instance.order.created_at)


class OrderStageInline(admin.TabularInline):
  model = OrderStage
  readonly_fields = ('stage_type',)
  formset = OrderStageFormSet
  extra = 0

  def has_add_permission(self, request, instance=None):
    return False

  def has_delete_permission(self, request, instance=None):
    return False

@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
  inlines = [OrderStageInline]
  list_display = (
    'user',
    'formatted_created_at',
  )

  @admin.display(description='Дата и время заказа')
  def formatted_created_at(self, instance):
    return format_datetime(instance.created_at)


admin.site.register(Category)


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


@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
  list_display = (
    'product',
    'rating',
    'user',
    'review_starts_with',
    'formatted_created_at',
  )

  @admin.display(description='Товар')
  def product(self, instance):
    return instance.variant.product
  
  @admin.display(description='Текст отзыва')
  def review_starts_with(self, instance):
    return crop_text(instance.text, 15)

  @admin.display(description='Дата создания отзыва')
  def formatted_created_at(self, instance):
    return format_datetime(instance.created_at)


@admin.register(Subcategory)
class SubcategoryAdmin(admin.ModelAdmin):
  list_display = (
    'name',
    'category',
  )


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
  list_display = (
    'fullname',
    'email',
    'phone_number',
  )

  @admin.display(description='Имя и фамилия')
  def fullname(self, instance):
    return instance.get_fullname()


@admin.register(Tag)
class TagAdmin(admin.ModelAdmin):
  form = TagForm


admin.site.register(OrderStageType)


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


@admin.register(OrderStage)
class OrderStageAdmin(admin.ModelAdmin):
  list_display = (
    'user',
    'created_at',
    'stage_type',
    'is_done',
    'modified_at',
  )
  list_editable = (
    'is_done',
  )

  @admin.display(description='Пользователь')
  def user(self, instance):
    return instance.order.user

  @admin.display(description='Дата создания заказа')
  def created_at(self, instance):
    return format_datetime(instance.order.created_at)
