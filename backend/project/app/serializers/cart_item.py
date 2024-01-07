from rest_framework import serializers
from app.models import CartItem, Variant
from .variant import CartVariantSerializer


class CartItemListSerializer(serializers.ModelSerializer):
  variant = CartVariantSerializer()

  class Meta:
    model = CartItem
    exclude = ('user',)

  
class LocalCartItemSerializer(serializers.ModelSerializer):
  class Meta:
    model = CartItem
    fields = ('variant', 'amount',)


class CreateCartItemFromLocalOneSerializer(serializers.ModelSerializer):
  def create(self, validated_data):
    return CartItem.objects.create(
      user = validated_data.get('user'),
      variant = validated_data.get('variant'),
      amount = validated_data.get('amount'),
    )

  class Meta:
    model = CartItem
    fields = ('variant', 'amount', 'user',)


class CreateCartItemSerializer(serializers.ModelSerializer):
  def validate(self, data):
    if not data['variant'].is_in_stock:
      raise serializers.ValidationError('Невозможно добавить в корзину вариант товара, которого нет в наличии')

    if CartItem.objects.filter(variant=data['variant'], user=self.context['request'].user).first():
      raise serializers.ValidationError('Товар уже есть в корзине')
    
    return data

  def create(self, validated_data):
    return CartItem.objects.create(
      user = self.context['request'].user,
      variant = validated_data.get('variant'),
      amount = validated_data.get('amount'),
    )

  class Meta:
    model = CartItem
    fields = ('variant', 'amount',)


class UpdateCartItemAmountSerializer(serializers.ModelSerializer):
  class Meta:
    model = CartItem
    fields = ('amount',)
