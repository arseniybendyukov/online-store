from rest_framework import serializers
from app.models import Product
from .variant import VariantSerializer
from .category import CategorySerializer
from .brand import BrandSerializer
from .tags import ProductTagSerializer


class ProductSerializer(serializers.ModelSerializer):
  render_name = serializers.CharField()
  variants = VariantSerializer(many=True)
  category = CategorySerializer()
  brand = BrandSerializer()
  avg_rating = serializers.FloatField()
  reviews_count = serializers.IntegerField(source='reviews.count')

  class Meta:
    model = Product


class ProductListSerializer(ProductSerializer):
  tags = ProductTagSerializer(many=True)

  class Meta(ProductSerializer.Meta):
    exclude = [
      'description',
      'silimar_products',
      'bought_together_products',
    ]


class ProductDetailSerializer(ProductSerializer):
  silimar_products = ProductListSerializer(many=True)
  bought_together_products = ProductListSerializer(many=True)

  class Meta(ProductSerializer.Meta):
    fields = '__all__'


class VariantProductSerializer(serializers.ModelSerializer):
  render_name = serializers.CharField()

  class Meta:
    model = Product
    fields = (
      'id',
      'render_name',
    )
