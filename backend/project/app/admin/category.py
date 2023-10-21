from django.contrib import admin
from app.models import Category


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
  list_display = ('name',)
