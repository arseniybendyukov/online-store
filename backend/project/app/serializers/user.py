from rest_framework import serializers
from app.models import User


class UserRegisterationSerializer(serializers.ModelSerializer):
  class Meta:
    model = User
    fields = ('id', 'first_name', 'last_name', 'email', 'password')
    extra_kwargs = {'password': {'write_only': True}}

  def create(self, validated_data):
    return User.objects.create_user(**validated_data)


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
