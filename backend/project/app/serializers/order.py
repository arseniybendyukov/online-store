from rest_framework import serializers
from app.models import Order, OrderedProduct, CartItem, OrderStageType, OrderStage
from .order_stage import OrderStageSerializer
from .ordered_product import OrderedProductListSerializer, OrderProductSerializer
from .promocode import PromocodeSerializer


class OrderListSerializer(serializers.ModelSerializer):
  products = OrderedProductListSerializer(many=True)
  is_active = serializers.BooleanField()
  promocode = PromocodeSerializer()

  class Meta:
    model = Order
    fields = (
      'id',
      'is_active',
      'products',
      'created_at',
      'is_cancelled',
      'promocode',
      'delivery_sum',
    )


class OrderDetailSerializer(serializers.ModelSerializer):
  products = OrderedProductListSerializer(many=True)
  stages = OrderStageSerializer(many=True)
  promocode = PromocodeSerializer()

  class Meta:
    model = Order
    exclude = ('user',)


class CreateOrderSerializer(serializers.ModelSerializer):
  products = OrderProductSerializer(many=True)

  def validate(self, data):
    if len(data['products']) < 1:
      raise serializers.ValidationError('Невозможно создать пустой заказ')

    is_every_variant_in_stock = True
    for ordered_product in data['products']:
      if not ordered_product['origin_variant'].is_in_stock:
        is_every_variant_in_stock = False
        break
    if not is_every_variant_in_stock:
      raise serializers.ValidationError('Невозможно создать заказ: товара нет в наличии')

    return data

  def create(self, validated_data):
    user = self.context['request'].user
    order = Order.objects.create(
      user=user,
      address=validated_data['address'],
      delivery_sum=validated_data['delivery_sum'],
      tariff=validated_data['tariff'],
      promocode=validated_data['promocode'],
    )

    for raw in validated_data['products']:
      OrderedProduct.objects.create(
        order=order,
        amount=raw['amount'],
        origin_variant=raw['origin_variant'],
        name=raw['origin_variant'].product.render_name,
        image=raw['origin_variant'].image,
        actual_price=raw['origin_variant'].actual_price,
        sale_price=raw['origin_variant'].sale_price,
        variant_name=raw['origin_variant'].name,
      )

      CartItem.objects.filter(
        variant=raw['origin_variant'],
        user=user,
      ).delete()

    for stage_type in OrderStageType.objects.all():
      OrderStage.objects.create(
        order=order,
        stage_type=stage_type,
        is_done=False,
      )

    return order

  class Meta:
    model = Order
    fields = (
      'products',
      'address',
      'delivery_sum',
      'tariff',
      'promocode',
    )


class CancelOrderSerializer(serializers.ModelSerializer):
  class Meta:
    model = Order
    fields = ('id',)
