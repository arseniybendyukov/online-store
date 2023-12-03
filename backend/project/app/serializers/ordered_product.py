from rest_framework import serializers
from app.models import OrderedProduct
from .variant import OriginVariantSerializer


class OrderProductSerializer(serializers.ModelSerializer):
  class Meta:
    model = OrderedProduct
    fields = ('origin_variant', 'amount',)


class OrderedProductListSerializer(serializers.ModelSerializer):
  origin_variant = OriginVariantSerializer()

  class Meta:
    model = OrderedProduct
    fields = (
      'id',
      'name',
      'image',
      'actual_price',
      'sale_price',
      'variant_name',
      'amount',
      'origin_variant',
    )
