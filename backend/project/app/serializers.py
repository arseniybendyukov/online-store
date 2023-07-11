from rest_framework import serializers
from django.contrib.auth import authenticate
from django.db.models import Count
from .models import Product, Tag, Category, Subcategory, Brand, Variant, Price, Review, User, Vote


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
      'saved_products',
      'phone_number',
    )


class UserRegisterationSerializer(serializers.ModelSerializer):
  class Meta:
    model = User
    fields = ("id", 'first_name', 'last_name', "email", "password")
    extra_kwargs = {"password": {"write_only": True}}

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
    exclude = ['product']


class ProductListSerializer(serializers.ModelSerializer):
  variants = VariantSerializer(many=True)
  tags = TagSerializer(many=True)
  subcategory = SubcategorySerializer()
  brand = BrandSerializer()
  avg_rating = serializers.FloatField()
  reviews_count = serializers.IntegerField(source='reviews.count')

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
