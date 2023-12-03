from rest_framework import serializers
from app.models import ProductTag, BlogTag


class ProductTagSerializer(serializers.ModelSerializer):
  class Meta:
    model = ProductTag
    fields = '__all__'


class BlogTagSerializer(serializers.ModelSerializer):
  class Meta:
    model = BlogTag
    fields = '__all__'