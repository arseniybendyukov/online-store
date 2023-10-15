from django.contrib import admin
from app.utils import crop_text, format_datetime
from app.models import Appeal


@admin.register(Appeal)
class AppealAdmin(admin.ModelAdmin):
  list_display = (
    'full_name',
    'email',
    'phone_number',
    'appeal_starts_with',
    'formatted_created_at',
  )
  
  @admin.display(description='Текст')
  def appeal_starts_with(self, instance):
    return crop_text(instance.text, 15)

  @admin.display(description='Дата и время создания')
  def formatted_created_at(self, instance):
    return format_datetime(instance.created_at)
