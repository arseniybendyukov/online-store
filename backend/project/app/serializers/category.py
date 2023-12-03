from rest_framework import serializers
from app.models import Category, Product


class CategorySerializer(serializers.ModelSerializer):
  parent = serializers.SerializerMethodField()

  def get_parent(self, instance):
    if instance.parent is not None:
      return CategorySerializer(instance.parent).data
    return None

  class Meta:
    model = Category
    fields = ('id', 'name', 'parent')


class CategoryListSerializer(serializers.ModelSerializer):
  count = serializers.SerializerMethodField()
  children = serializers.SerializerMethodField()
  parents = serializers.SerializerMethodField()

  def get_children(self, instance):
    if instance.children.all().count() > 0:
      return CategoryListSerializer(instance.children, many=True).data
    return None

  def get_parents(self, instance):
    parents = instance.get_all_parents()
    if len(parents) > 0:
      return CategoryIdsSerializer(reversed(parents), many=True).data
    return None

  def get_count(self, instance):
    return Product.objects.filter(
      category__in=[instance, *instance.get_all_children()]
    ).count()

  class Meta:
    model = Category
    fields = (
      'id',
      'name',
      'count',
      'children',
      'parents',
    )


class CategoryIdsSerializer(serializers.ModelSerializer):
  class Meta:
    model = Category
    fields = ('id', 'name',)
