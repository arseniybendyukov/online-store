from rest_framework import serializers
from app.models import OrderedProduct, Review
from .variant import OriginVariantSerializer


class OrderProductSerializer(serializers.ModelSerializer):
  class Meta:
    model = OrderedProduct
    fields = ('origin_variant', 'amount',)


class OrderedProductListSerializer(serializers.ModelSerializer):
  origin_variant = OriginVariantSerializer()
  is_review_allowed = serializers.SerializerMethodField()

  def get_is_review_allowed(self, instance):
    if not instance.order.is_cancelled:
      if instance.origin_variant:
        user =  self.context['request'].user
        has_review = Review.objects.filter(user=user, variant=instance.origin_variant).exists()
        done_stages = instance.order.stages.filter(is_done=True)
        return not has_review and done_stages.count() == instance.order.stages.count()
      return False
    return False

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
      'is_review_allowed',
    )
