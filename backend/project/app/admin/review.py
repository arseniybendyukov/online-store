from django.contrib import admin
from app.utils import crop_text, format_datetime
from app.models import Review


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
