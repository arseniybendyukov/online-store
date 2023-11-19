from django.contrib import admin
from app.utils import crop_text, format_datetime
from app.models import Vote


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
  product.admin_order_field = 'review__variant__product__name'
    
  @admin.display(description='Автор отзыва')
  def review_creator(self, instance):
    return instance.review.user
  review_creator.admin_order_field = 'review__user__first_name'
  
  @admin.display(description='Текст отзыва')
  def review_starts_with(self, instance):
    return crop_text(instance.review.text, 15)

  @admin.display(description='Дата создания отзыва')
  def review_created_at(self, instance):
    return format_datetime(instance.review.created_at)
  review_created_at.admin_order_field = 'review__created_at'
