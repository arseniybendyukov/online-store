from django.contrib import admin
from .models import Category, Subcategory, Brand, Tag, Price, Product, Variant, User, CartItem, Review, Order, OrderedProduct, Vote
from .forms import TagForm

admin.site.register(Category)
admin.site.register(Subcategory)
admin.site.register(Brand)
admin.site.register(Price)
admin.site.register(Variant)
admin.site.register(User)
admin.site.register(CartItem)
admin.site.register(Review)
admin.site.register(Order)
admin.site.register(OrderedProduct)
admin.site.register(Vote)

@admin.register(Tag)
class TagAdmin(admin.ModelAdmin):
  form = TagForm

class VariantInline(admin.TabularInline):
  model = Variant
  extra = 1

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
  inlines = [VariantInline]
