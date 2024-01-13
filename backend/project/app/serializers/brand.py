from rest_framework import serializers
from app.models import Brand, Product


class BrandSerializer(serializers.ModelSerializer):
  class Meta:
    model = Brand
    fields = ('id', 'name', 'manufacturer_country',)
    depth = 1


class BrandImageListSerializer(serializers.ModelSerializer):
  class Meta:
    model = Brand
    fields = ('id', 'image',)


class BrandCountListSerializer(serializers.ModelSerializer):
  count = serializers.SerializerMethodField()

  def get_count(self, instance):
    return Product.objects.filter(brand=instance).count()

  class Meta:
    model = Brand
    fields = ('id', 'name', 'count',)
