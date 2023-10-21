from django.contrib import admin
from app.models import Brand

@admin.register(Brand)
class BrandAdmin(admin.ModelAdmin):
  list_display = ('name',)
