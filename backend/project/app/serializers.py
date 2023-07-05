from rest_framework import serializers
from django.db.models import Count
from .models import Product, Tag, Category, Subcategory, Brand, Variant, Price, Review, User, Vote


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
    fields = '__all__'


class VariantSerializer(serializers.ModelSerializer):
  price = PriceSerializer()

  class Meta:
    model = Variant
    exclude = ['product']


class ProductListSerializer(serializers.ModelSerializer):
  variants = VariantSerializer(many=True)
  tags = TagSerializer(many=True)
  subcategory = SubcategorySerializer()
  brand = BrandSerializer()
  avg_rating = serializers.FloatField()
  reviews_count = serializers.IntegerField(source='reviews.count')

  class Meta:
    model = Product
    exclude = [
      'description',
      'silimar_products',
      'bought_together_products',
    ]


class UserSerializer(serializers.ModelSerializer):
  class Meta:
    model = User
    fields = [
      'id',
      'first_name',
      'last_name',
      'image',
    ]


class ReviewSerializer(serializers.ModelSerializer):
  user = UserSerializer()
  variant = serializers.CharField(source='variant.name')
  votes = serializers.IntegerField(source='votes_count')

  class Meta:
    model = Review
    exclude = ['product']


class ProductDetailSerializer(serializers.ModelSerializer):
  variants = VariantSerializer(many=True)
  subcategory = SubcategorySerializer()
  brand = BrandSerializer()
  avg_rating = serializers.FloatField()
  silimar_products = ProductListSerializer(many=True)
  bought_together_products = ProductListSerializer(many=True) 
  reviews_count = serializers.IntegerField(source='reviews.count')

  class Meta:
    model = Product
    fields = '__all__'


class ReviewListSerializer(serializers.ModelSerializer):
  reviews = ReviewSerializer(many=True)

  class Meta:
    model = Product
    fields = ['reviews']


class SubcategoryListSerializer(serializers.ModelSerializer):
  count = serializers.SerializerMethodField()

  def get_count(self, obj):
    return Product.objects.filter(subcategory=obj).count()

  class Meta:
    model = Subcategory
    fields = '__all__'


class CategoryListSerializer(serializers.ModelSerializer):
  subcategories = SubcategoryListSerializer(many=True)
  count = serializers.SerializerMethodField()

  def get_count(self, obj):
    return Product.objects.filter(subcategory__category=obj).count()

  class Meta:
    model = Category
    fields = '__all__'


class BrandListSerializer(serializers.ModelSerializer):
  count = serializers.SerializerMethodField()

  def get_count(self, obj):
    return Product.objects.filter(brand=obj).count()

  class Meta:
    model = Brand
    fields = ('id', 'name', 'count')
