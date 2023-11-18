from rest_framework import serializers
from django.utils import html
from django.contrib.auth import authenticate
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.db.models import Count
from .models import (
  Appeal,
  BlogPost,
  Product,
  ProductTag,
  BlogTag,
  Category,
  Brand,
  Variant,
  Review,
  User,
  Vote,
  CartItem,
  Order,
  OrderedProduct,
  OrderStage,
  OrderStageType,
)


# todo: разбить на файлы
class BlogListSerializer(serializers.ModelSerializer):
  class Meta:
    model = BlogPost
    exclude = ('text',)
    depth = 1


class BlogDetailSerializer(serializers.ModelSerializer):
  class Meta:
    model = BlogPost
    fields = '__all__'
    depth = 1


class UserDetailSerializer(serializers.ModelSerializer):
  class Meta:
    model = User
    fields = (
      'email',
      'first_name',
      'last_name',
      'color',
      'image',
      'patronymic',
      'birthdate',
      'phone_number',
    )


class UserRegisterationSerializer(serializers.ModelSerializer):
  class Meta:
    model = User
    fields = ('id', 'first_name', 'last_name', 'email', 'password')
    extra_kwargs = {'password': {'write_only': True}}

  def create(self, validated_data):
    return User.objects.create_user(**validated_data)


class UpdateAvatarSerializer(serializers.ModelSerializer):
  class Meta:
    model = User
    fields = ('image',)


class ActivateEmailSerializer(serializers.Serializer):
  uidb64 = serializers.CharField()
  token = serializers.CharField()


class CustomJWTSerializer(TokenObtainPairSerializer):
  def validate(self, attrs):
    data = super().validate(attrs)

    user = User.objects.filter(email=attrs.get('email')).first()
  
    if user and not user.is_email_verified:
      raise serializers.ValidationError({
        'email': 'Электронная почта не верифицирована!'
      })

    return data


class ResendActivationSerializer(serializers.Serializer):
  email = serializers.EmailField()


class CategorySerializer(serializers.ModelSerializer):
  parent = serializers.SerializerMethodField()

  def get_parent(self, instance):
    if instance.parent is not None:
      return CategorySerializer(instance.parent).data
    else:
      return None
  
  class Meta:
    model = Category
    fields = ('id', 'name', 'parent')


class ProductTagSerializer(serializers.ModelSerializer):
  class Meta:
    model = ProductTag
    fields = '__all__'


class BlogTagSerializer(serializers.ModelSerializer):
  class Meta:
    model = BlogTag
    fields = '__all__'


class BrandSerializer(serializers.ModelSerializer):
  class Meta:
    model = Brand
    fields = '__all__'


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


class UserSmallSerializer(serializers.ModelSerializer):
  class Meta:
    model = User
    fields = [
      'id',
      'first_name',
      'last_name',
      'color',
      'image',
    ]


class ReviewSerializer(serializers.ModelSerializer):
  user = UserSmallSerializer()
  variant = serializers.CharField(source='variant.name')
  votes = serializers.ListField(source='get_votes')
  is_my_vote_positive = serializers.SerializerMethodField()

  def get_is_my_vote_positive(self, instance):
    user =  self.context['request'].user
    if user.is_authenticated:
      vote = Vote.objects.filter(user=user, review=instance).first()
      return vote.is_positive if vote else None
    return None

  class Meta:
    model = Review
    fields = '__all__'


class CategoryIdsSerializer(serializers.ModelSerializer):
  class Meta:
    model = Category
    fields = ('id', 'name',)


class CategoryListSerializer(serializers.ModelSerializer):
  count = serializers.SerializerMethodField()
  children = serializers.SerializerMethodField()
  parents = serializers.SerializerMethodField()

  def get_children(self, instance):
    if instance.children.all().count() > 0:
      return CategoryListSerializer(instance.children, many=True).data
    else:
      return None
  
  def get_parents(self, instance):
    parents = instance.get_all_parents()
    if len(parents) > 0:
      return CategoryIdsSerializer(reversed(parents), many=True).data
    else:
      return None

  def get_count(self, instance):
    return Product.objects.filter(category__in=[instance, *instance.get_all_children()]).count()

  class Meta:
    model = Category
    fields = (
      'id',
      'name',
      'count',
      'children',
      'parents',
    )


class VariantProductSerializer(serializers.ModelSerializer):
  render_name = serializers.CharField()

  class Meta:
    model = Product
    fields = (
      'id',
      'render_name',
    )


class BrandListSerializer(serializers.ModelSerializer):
  count = serializers.SerializerMethodField()

  def get_count(self, instance):
    return Product.objects.filter(brand=instance).count()

  class Meta:
    model = Brand
    fields = '__all__'


class MyReviewSerializer(serializers.ModelSerializer):
  user = UserSmallSerializer()
  votes = serializers.ListField(source='get_votes')
  product = serializers.IntegerField(source='variant.product.id')
  is_my_vote_positive = serializers.SerializerMethodField()

  def get_is_my_vote_positive(self, instance):
    user =  self.context['request'].user
    vote = Vote.objects.filter(user=user, review=instance).first()
    return vote.is_positive if vote else None

  class Meta:
    model = Review
    fields = (
      'id',
      'user',
      'product',
      'created_at',
      'text',
      'votes',
      'rating',
      'is_my_vote_positive',
    )


class AddToCartSerializer(serializers.Serializer):
  variant_id = serializers.IntegerField()
  amount = serializers.IntegerField()

  def validate(self, data):
    variant = Variant.objects.get(id=data['variant_id'])

    if not variant.is_in_stock:
      raise serializers.ValidationError('Невозможно добавить в корзину вариант товара, которого нет в наличии')

    cart_item = CartItem.objects.filter(variant=variant).first()
    if cart_item:
      raise serializers.ValidationError('Товар уже есть в корзине')
    
    return data

  def create(self, validated_data):
    return CartItem.objects.create(
      user = self.context['request'].user,
      variant = Variant.objects.get(id=validated_data.get('variant_id')),
      amount = validated_data.get('amount'),
    )


class RemoveFromCartSerializer(serializers.Serializer):
  variant_id = serializers.IntegerField()

  def validate(self, data):
    variant = Variant.objects.get(id=data['variant_id'])

    if not variant:
      raise serializers.ValidationError('Ошибка: такого варианта товара не существует')
    
    cart_item = CartItem.objects.filter(variant=variant).first()
    if not cart_item:
      raise serializers.ValidationError('Товара нет корзине')
    
    return data


class CartVariantSerializer(serializers.ModelSerializer):
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


class CartItemListSerializer(serializers.ModelSerializer):
  variant = CartVariantSerializer()

  class Meta:
    model = CartItem
    exclude = ('user',)


class UpdateCartAmountSerializer(serializers.ModelSerializer):
  class Meta:
    model = CartItem
    fields = ('amount',)


class UpdateUserSerializer(serializers.ModelSerializer):
  class Meta:
    model = User
    fields = (
      'first_name',
      'last_name',
      'patronymic',
      'birthdate',
      'phone_number',
      'image',
    )


class OrderProductSerializer(serializers.ModelSerializer):
  class Meta:
    model = OrderedProduct
    fields = ('origin_variant', 'amount',)


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
    order = Order.objects.create(user=user)

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
    fields = ('products',)


class OrderProductOriginVariantSerializer(serializers.ModelSerializer):
  class Meta:
    model = Variant
    fields = (
      'id',
      'product',
    )


class OrderedProductListSerializer(serializers.ModelSerializer):
  origin_variant = OrderProductOriginVariantSerializer()

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


class OrderListSerializer(serializers.ModelSerializer):
  products = OrderedProductListSerializer(many=True)

  class Meta:
    model = Order
    fields = (
      'id',
      'is_active',
      'products',
      'created_at',
    )


class OrderStageSerializer(serializers.ModelSerializer):
  class Meta:
    model = OrderStage
    exclude = ('order',)
    depth = 1


class OrderDetailSerializer(serializers.ModelSerializer):
  products = OrderedProductListSerializer(many=True)
  stages = OrderStageSerializer(many=True)

  class Meta:
    model = Order
    exclude = ('user',)

  
class SavedProductVariantSerializer(serializers.ModelSerializer):
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


class AppealSerializer(serializers.ModelSerializer):
  class Meta:
    model = Appeal
    fields = '__all__'


class VoteSerializer(serializers.ModelSerializer):
  class Meta:
    model = Vote
    exclude = ('user',)


class CreateReviewSerializer(serializers.ModelSerializer):
  def create(self, validated_data):
    return Review.objects.create(
      user=self.context['request'].user,
      variant=validated_data.get('variant'),
      text=validated_data.get('text'),
      rating=validated_data.get('rating'),
    )

  class Meta:
    model = Review
    fields = ('variant', 'text', 'rating',)
