from django.contrib import admin
from app.models import Category


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
  list_display = ('name', 'parents',)
  search_fields = ('name',)

  @admin.display(description='Родительские категории')
  def parents(self, instance):
    return ' → '.join(map(
      lambda category: category.name,
      reversed(instance.get_all_parents())
    ))
