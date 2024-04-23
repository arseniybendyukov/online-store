from rest_framework import serializers
from app.models import Variant, CartItem


class VariantSerializer(serializers.ModelSerializer):
  cart_item_id = serializers.SerializerMethodField()
  is_saved = serializers.SerializerMethodField()

  def get_cart_item_id(self, instance):
    user =  self.context['request'].user
    if user.is_authenticated:
      cart_item = CartItem.objects.filter(
        user=user,
        variant__id=instance.id,
      ).first()
      return cart_item.id if cart_item else None
    return None

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
      'cart_item_id',
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
      'weight',
      'width',
      'height',
      'length',
    )


class SavedVariantSerializer(serializers.ModelSerializer):
  # локальный import, чтобы избежать круговой зависимости
  from .product import VariantProductSerializer
  
  product = VariantProductSerializer()
  cart_item_id = serializers.SerializerMethodField()

  def get_cart_item_id(self, instance):
    user =  self.context['request'].user
    if user.is_authenticated:
      cart_item = CartItem.objects.filter(
        user=user,
        variant__id=instance.id,
      ).first()
      return cart_item.id if cart_item else None
    return None

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
      'cart_item_id',
      'product',
    )


class OriginVariantSerializer(serializers.ModelSerializer):
  class Meta:
    model = Variant
    fields = (
      'id',
      'product',
    )
