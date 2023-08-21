from rest_framework import serializers
from django.contrib.auth import authenticate
from django.db.models import Count
from .models import (
  Appeal,
  BlogPost,
  Product,
  ProductTag,
  Category,
  Subcategory,
  Brand,
  Variant,
  Price,
  Review,
  User,
  Vote,
  CartItem,
  Order,
  OrderedProduct,
  OrderStage,
  OrderStageType,
)

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


class UserLoginSerializer(serializers.Serializer):
  email = serializers.CharField()
  password = serializers.CharField(write_only=True)

  def validate(self, data):
    user = authenticate(**data)
    if user is not None:
      return user
    raise serializers.ValidationError('Неправильные логин или пароль')


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
    model = ProductTag
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
    fields = (
      'pk',
      'name',
      'price',
    )


class ProductListSerializer(serializers.ModelSerializer):
  variants = VariantSerializer(many=True)
  tags = TagSerializer(many=True)
  subcategory = SubcategorySerializer()
  brand = BrandSerializer()
  avg_rating = serializers.FloatField()
  reviews_count = serializers.IntegerField(source='reviews.count')
  is_saved = serializers.SerializerMethodField()
  is_in_cart = serializers.SerializerMethodField()

  def get_is_saved(self, obj):
    user =  self.context['request'].user
    return user.saved_products.filter(pk=obj.id).exists()

  def get_is_in_cart(self, obj):
    return CartItem.objects.filter(
      user=self.context['request'].user,
      variant__product__id=obj.id,
    ).exists()

  class Meta:
    model = Product
    exclude = [
      'description',
      'silimar_products',
      'bought_together_products',
    ]


class UserSmallSerializer(serializers.ModelSerializer):
  class Meta:
    model = User
    fields = [
      'id',
      'first_name',
      'last_name',
      'image',
    ]


class ReviewSerializer(serializers.ModelSerializer):
  user = UserSmallSerializer()
  variant = serializers.CharField(source='variant.name')
  votes = serializers.ListField(source='get_votes')
  is_my_vote_positive = serializers.SerializerMethodField()

  def get_is_my_vote_positive(self, obj):
    user =  self.context['request'].user
    vote = Vote.objects.filter(user=user, review=obj).first()
    return vote.is_positive if vote else None

  class Meta:
    model = Review
    fields = '__all__'


class ProductDetailSerializer(serializers.ModelSerializer):
  variants = VariantSerializer(many=True)
  subcategory = SubcategorySerializer()
  brand = BrandSerializer()
  avg_rating = serializers.FloatField()
  silimar_products = ProductListSerializer(many=True)
  bought_together_products = ProductListSerializer(many=True) 
  reviews_count = serializers.IntegerField(source='reviews.count')
  is_saved = serializers.SerializerMethodField()
  is_in_cart = serializers.SerializerMethodField()

  def get_is_saved(self, obj):
    user =  self.context['request'].user
    return user.saved_products.filter(pk=obj.id).exists()

  def get_is_in_cart(self, obj):
    return CartItem.objects.filter(
      user=self.context['request'].user,
      variant__product__id=obj.id,
    ).exists()

  class Meta:
    model = Product
    fields = '__all__'


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
    fields = '__all__'


class SavedProductSerializer(serializers.ModelSerializer):
  variants = VariantSerializer(many=True)
  is_in_cart = serializers.SerializerMethodField()

  def get_is_in_cart(self, obj):
    return CartItem.objects.filter(
      user=self.context['request'].user,
      variant__product__id=obj.id,
    ).exists()

  class Meta:
    model = Product
    fields = (
      'id',
      'name',
      'image',
      'variants',
      'is_in_cart',
    )


class MyReviewSerializer(serializers.ModelSerializer):
  user = UserSmallSerializer()
  votes = serializers.ListField(source='get_votes')
  product = serializers.IntegerField(source='variant.product.id')
  is_my_vote_positive = serializers.SerializerMethodField()

  def get_is_my_vote_positive(self, obj):
    user =  self.context['request'].user
    vote = Vote.objects.filter(user=user, review=obj).first()
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

  def create(self, validated_data):
    return CartItem.objects.create(
      user = self.context['request'].user,
      variant = Variant.objects.get(pk=validated_data.get('variant_id')),
      amount = validated_data.get('amount'),
    )


class CartProductSerializer(serializers.ModelSerializer):
  is_saved = serializers.SerializerMethodField()

  def get_is_saved(self, obj):
    user =  self.context['request'].user
    return user.saved_products.filter(pk=obj.id).exists()

  class Meta:
    model = Product
    fields = (
      'id',
      'name',
      'image',
      'is_saved',
    )


class CartVariantSerializer(serializers.ModelSerializer):
  price = PriceSerializer()
  product = CartProductSerializer()

  class Meta:
    model = Variant
    fields = (
      'pk',
      'name',
      'price',
      'product',
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
    )


class OrderProductSerializer(serializers.ModelSerializer):
  class Meta:
    model = OrderedProduct
    fields = ('variant', 'amount',)


class CreateOrderSerializer(serializers.ModelSerializer):
  products = OrderProductSerializer(many=True)

  def validate(self, data):
    if not len(data['products']) > 0:
      raise serializers.ValidationError('Невозможно создать пустой заказ')
    return data

  def create(self, validated_data):
    order = Order.objects.create(user=self.context['request'].user)

    for raw in validated_data['products']:
      OrderedProduct.objects.create(
        order=order,
        variant=raw['variant'],
        amount=raw['amount'],
      )

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


class OrderedVariantProductSerializer(serializers.ModelSerializer):
  class Meta:
    model = Product
    fields = (
      'id',
      'name',
      'image',
    )

  
class OrderedVariantSerializer(serializers.ModelSerializer):
  price = PriceSerializer()
  product = OrderedVariantProductSerializer()
  
  class Meta:
    model = Variant
    fields = (
      'pk',
      'name',
      'price',
      'product',
    )


class OrderedProductListSerializer(serializers.ModelSerializer):
  variant = OrderedVariantSerializer()

  class Meta:
    model = OrderedProduct
    exclude = ('order',)


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
    print(validated_data)

    return Review.objects.create(
      user=self.context['request'].user,
      variant=validated_data.get('variant'),
      text=validated_data.get('text'),
      rating=validated_data.get('rating'),
    )

  class Meta:
    model = Review
    fields = ('variant', 'text', 'rating',)
