from django.contrib import admin
from app.models import Promocode

@admin.register(Promocode)
class PromocodeAdmin(admin.ModelAdmin):
  list_display = ('name', 'percentage', 'is_active',)
