from rest_framework import serializers
from django.contrib.auth import authenticate
from django.db.models import Count
from .models import (
  Product,
  Tag,
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
)


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
    model = Tag
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

  class Meta:
    model = Review
    exclude = ['product']


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
    fields = '__all__'


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
    fields = ('product', 'amount',)


class CreateOrderSerializer(serializers.ModelSerializer):
  products = OrderProductSerializer(many=True)

  def create(self, validated_data):
    order = Order.objects.create(user=self.context['request'].user)
    for raw in validated_data['products']:
      OrderedProduct.objects.create(
        order=order,
        product=raw['product'],
        amount=raw['amount'],
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
    fields = ('products', 'created_at',)
