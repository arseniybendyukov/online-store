from rest_framework import serializers
from app.models import Brand, Product


class BrandSerializer(serializers.ModelSerializer):
  class Meta:
    model = Brand
    fields = '__all__'


class BrandListSerializer(serializers.ModelSerializer):
  count = serializers.SerializerMethodField()

  def get_count(self, instance):
    return Product.objects.filter(brand=instance).count()

  class Meta:
    model = Brand
    fields = '__all__'
