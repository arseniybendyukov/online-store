from rest_framework import generics, views
from rest_framework.response import Response
from django.db.models import Max
from .models import Product, Tag, Price, Category, Brand
from .serializers import ProductSerializer, TagSerializer, CategoryListSerializer, BrandListSerializer


class ProductList(generics.ListAPIView):
  queryset = Product.objects.all()
  serializer_class = ProductSerializer

class TagList(generics.ListAPIView):
  queryset = Tag.objects.all()
  serializer_class = TagSerializer

class MinMaxPrice(views.APIView):
  def get(self, request):
    prices = [price.get_price() for price in Price.objects.all()]
    return Response({
      'min': min(prices),
      'max': max(prices),
    })

class CategoryList(generics.ListAPIView):
  queryset = Category.objects.all()
  serializer_class = CategoryListSerializer

class BrandList(generics.ListAPIView):
  queryset = Brand.objects.all()
  serializer_class = BrandListSerializer
