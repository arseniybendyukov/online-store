from django.contrib import admin
from .models import Category, Subcategory, Brand, Tag, Price, Product, Variant, User, CartItem, Review, Order, OrderedProduct

admin.site.register(Category)
admin.site.register(Subcategory)
admin.site.register(Brand)
admin.site.register(Tag)
admin.site.register(Price)
admin.site.register(Product)
admin.site.register(Variant)
admin.site.register(User)
admin.site.register(CartItem)
admin.site.register(Review)
admin.site.register(Order)
admin.site.register(OrderedProduct)
