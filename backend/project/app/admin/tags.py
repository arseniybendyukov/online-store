from django.contrib import admin
from app.forms import TagForm
from app.models import ProductTag, BlogTag


@admin.register(ProductTag)
class ProductTagAdmin(admin.ModelAdmin):
  form = TagForm


@admin.register(BlogTag)
class BlogTagAdmin(admin.ModelAdmin):
  form = TagForm
