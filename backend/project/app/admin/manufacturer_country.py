from django.contrib import admin
from app.models import ManufacturerCountry

@admin.register(ManufacturerCountry)
class ManufacturerCountryAdmin(admin.ModelAdmin):
  list_display = ('name',)
