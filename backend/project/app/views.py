from rest_framework import generics, views
from rest_framework import filters
from django_filters import rest_framework as django_filters_rest
from rest_framework.response import Response
from django.db.models import Max
from .models import Product, Tag, Price, Category, Brand
from .serializers import ProductSerializer, TagSerializer, CategoryListSerializer, BrandListSerializer
from .ordering import ProductCustomOrdering


class ProductList(generics.ListAPIView):
  serializer_class = ProductSerializer
  filter_backends = (
    django_filters_rest.DjangoFilterBackend,
    filters.SearchFilter,
    ProductCustomOrdering,
  )
  search_fields = ('name',)
  filterset_fields = ('tags__id', 'subcategory__id',)
  
  def get_queryset(self):
    queryset = Product.objects.all()
    
    # Фильтрация по минимальной и максимальной цене
    min_price = self.request.query_params.get('min_price')
    max_price = self.request.query_params.get('max_price')

    if min_price and max_price:
      filtered_objects = filter(
        lambda o: int(min_price) <= o.variants.first().price.get_price() <= int(max_price),
        queryset
      )
      filtered_objects_ids = [o.id for o in filtered_objects]
      queryset = Product.objects.filter(id__in=filtered_objects_ids)


    # Фильтрация по подкатегориям
    subcategory_ids = self.request.query_params.getlist('subcategory_id[]', '')
    
    if subcategory_ids:
      queryset = queryset.filter(subcategory__id__in=map(int, subcategory_ids))


    # Фильтрация по брендам
    brand_ids = self.request.query_params.getlist('brand_id[]', '')
    
    if brand_ids:
      queryset = queryset.filter(brand__id__in=map(int, brand_ids))


    return queryset


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
