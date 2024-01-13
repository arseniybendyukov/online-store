from rest_framework import serializers
from django.db.models import Case, When, F, PositiveIntegerField
from app.models import Product
from .variant import VariantSerializer
from .category import CategorySerializer
from .brand import BrandSerializer
from .tags import ProductTagSerializer


class ProductSerializer(serializers.ModelSerializer):
  render_name = serializers.CharField()
  category = CategorySerializer()
  brand = BrandSerializer()
  avg_rating = serializers.FloatField()
  reviews_count = serializers.IntegerField(source='reviews.count')

  class Meta:
    model = Product


class ProductListSerializer(ProductSerializer):
  tags = ProductTagSerializer(many=True)
  variants = serializers.SerializerMethodField()

  def get_variants(self, instance):
    min_price = self.context['request'].query_params.get('min_price')
    max_price = self.context['request'].query_params.get('max_price')
    variants = instance.variants
    if min_price and max_price:
      variants = instance.variants.annotate(price=Case(
        When(sale_price__isnull=False, then=F('sale_price')),
        default=F('actual_price'),
        output_field=PositiveIntegerField(),
      )).filter(
        price__gte=int(min_price),
        price__lte=int(max_price),
      )
    return VariantSerializer(variants, many=True, context=self.context).data

  class Meta(ProductSerializer.Meta):
    exclude = [
      'description',
      'silimar_products',
      'bought_together_products',
    ]


class ProductDetailSerializer(ProductSerializer):
  silimar_products = ProductListSerializer(many=True)
  bought_together_products = ProductListSerializer(many=True)
  variants = VariantSerializer(many=True)

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
