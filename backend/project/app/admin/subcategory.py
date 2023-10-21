from django.contrib import admin
from app.models import Subcategory


@admin.register(Subcategory)
class SubcategoryAdmin(admin.ModelAdmin):
  list_display = ('name', 'category',)
