from rest_framework import serializers
from app.models import User
from .cart_item import LocalCartItemSerializer, CreateCartItemFromLocalOneSerializer


class UserRegisterationSerializer(serializers.ModelSerializer):
  cart_items = LocalCartItemSerializer(many=True)

  class Meta:
    model = User
    fields = ('id', 'first_name', 'last_name', 'email', 'password', 'cart_items')
    extra_kwargs = {'password': {'write_only': True}}

  def create(self, validated_data):
    cart_items = validated_data['cart_items']
    user = User.objects.create_user(
      email=validated_data['email'],
      first_name=validated_data['first_name'],
      last_name=validated_data['last_name'],
      password=validated_data['password'],
    )
    for cart_item in cart_items:
      serializer = CreateCartItemFromLocalOneSerializer(data={
        'user': user.id,
        'variant': cart_item['variant'].id,
        'amount': cart_item['amount'],
      })
      if serializer.is_valid():
        serializer.save()
    return user


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


class UserSmallSerializer(serializers.ModelSerializer):
  class Meta:
    model = User
    fields = (
      'id',
      'first_name',
      'last_name',
      'color',
      'image',
    )


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


class UpdateAvatarSerializer(serializers.ModelSerializer):
  class Meta:
    model = User
    fields = ('image',)
