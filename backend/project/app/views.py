from rest_framework import generics
from .models import Product, Tag
from .serializers import ProductSerializer, TagSerializer


class ProductList(generics.ListAPIView):
  queryset = Product.objects.all()
  serializer_class = ProductSerializer

class TagList(generics.ListAPIView):
  queryset = Tag.objects.all()
  serializer_class = TagSerializer
