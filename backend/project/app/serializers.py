from rest_framework import serializers
from django.db.models import Avg
from .models import Product, Tag, Category, Subcategory, Brand, Variant, Price


class CategorySerializer(serializers.ModelSerializer):
  class Meta:
    model = Category
    fields = '__all__'


class SubcategorySerializer(serializers.ModelSerializer):
  category = CategorySerializer()

  class Meta:
    model = Subcategory
    fields = '__all__'


class TagSerializer(serializers.ModelSerializer):
  class Meta:
    model = Tag
    fields = '__all__'


class BrandSerializer(serializers.ModelSerializer):
  class Meta:
    model = Brand
    fields = '__all__'


class PriceSerializer(serializers.ModelSerializer):
  class Meta:
    model = Price
    exclude = ['id']


class VariantSerializer(serializers.ModelSerializer):
  price = PriceSerializer()

  class Meta:
    model = Variant
    exclude = ['product']


class ProductSerializer(serializers.ModelSerializer):
  variants = VariantSerializer(many=True)
  tags = TagSerializer(many=True)
  subcategory = SubcategorySerializer()
  brand = BrandSerializer()
  avg_rating = serializers.SerializerMethodField()
  reviews_count = serializers.IntegerField(source='reviews.count')

  def get_avg_rating(self, obj):
    avg_rating = obj.reviews.all().aggregate(Avg('rating'))['rating__avg'] or 0
    return round(avg_rating, 1)

  class Meta:
    model = Product
    fields = '__all__'
