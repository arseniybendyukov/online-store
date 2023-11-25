from rest_framework import serializers
from app.models import Variant, CartItem


class VariantSerializer(serializers.ModelSerializer):
  is_in_cart = serializers.SerializerMethodField()
  is_saved = serializers.SerializerMethodField()

  def get_is_in_cart(self, instance):
    user =  self.context['request'].user
    if user.is_authenticated:
      return CartItem.objects.filter(
        user=self.context['request'].user,
        variant__id=instance.id,
      ).exists()
    return False

  def get_is_saved(self, instance):
    user =  self.context['request'].user
    if user.is_authenticated:
      return user.saved_product_variants.filter(id=instance.id).exists()
    return False

  class Meta:
    model = Variant
    fields = (
      'id',
      'name',
      'is_in_stock',
      'image',
      'actual_price',
      'sale_price',
      'percentage',
      'is_in_cart',
      'is_saved',
    )


class CartVariantSerializer(serializers.ModelSerializer):
  # локальный import, чтобы избежать круговой зависимости
  from .product import VariantProductSerializer

  product = VariantProductSerializer()
  is_saved = serializers.SerializerMethodField()

  def get_is_saved(self, instance):
    user =  self.context['request'].user
    if user.is_authenticated:
      return user.saved_product_variants.filter(id=instance.id).exists()
    return False

  class Meta:
    model = Variant
    fields = (
      'id',
      'name',
      'is_in_stock',
      'image',
      'actual_price',
      'sale_price',
      'percentage',
      'product',
      'is_saved',
    )


class SavedVariantSerializer(serializers.ModelSerializer):
  # локальный import, чтобы избежать круговой зависимости
  from .product import VariantProductSerializer
  
  product = VariantProductSerializer()
  is_in_cart = serializers.SerializerMethodField()

  def get_is_in_cart(self, instance):
    return CartItem.objects.filter(
      user=self.context['request'].user,
      variant__id=instance.id,
    ).exists()

  class Meta:
    model = Variant
    fields = (
      'id',
      'name',
      'is_in_stock',
      'image',
      'actual_price',
      'sale_price',
      'percentage',
      'is_in_cart',
      'product',
    )


class OriginVariantSerializer(serializers.ModelSerializer):
  class Meta:
    model = Variant
    fields = (
      'id',
      'product',
    )
