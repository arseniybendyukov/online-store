from django.contrib import admin
from app.utils import crop_text
from app.models import BlogPost


@admin.register(BlogPost)
class BlogPostAdmin(admin.ModelAdmin):
  list_display = (
    'heading_starts_with',
    'created_at',
  )
  
  @admin.display(description='Заголовок')
  def heading_starts_with(self, instance):
    return crop_text(instance.heading, 30)
