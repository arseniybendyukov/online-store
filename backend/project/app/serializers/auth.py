from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from app.models import User


class CustomJWTSerializer(TokenObtainPairSerializer):
  def validate(self, attrs):
    data = super().validate(attrs)
    user = User.objects.filter(email=attrs.get('email')).first()
    if user and not user.is_email_verified:
      raise serializers.ValidationError({
        'email': 'Email not verified!'
      })
    return data


class ActivateEmailSerializer(serializers.Serializer):
  uidb64 = serializers.CharField()
  token = serializers.CharField()


class ResendEmailActivationSerializer(serializers.Serializer):
  email = serializers.EmailField()
