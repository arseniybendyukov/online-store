from rest_framework import generics, permissions
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter
from app.ordering import ProductCustomOrdering
from django.db.models import Case, When, F, PositiveIntegerField
from app.models import Product, Category
from app.serializers import ProductListSerializer, ProductDetailSerializer


class ProductListView(generics.ListAPIView):
  permission_classes = (permissions.AllowAny,)
  serializer_class = ProductListSerializer
  filter_backends = (
    DjangoFilterBackend,
    SearchFilter,
    ProductCustomOrdering,
  )
  # TODO: ?сделать поиск по категории и ее родителям?
  search_fields = ('name', 'brand__name',)
  filterset_fields = ('tags__id',)

  def _filter_by_category(self, queryset, category_id):
    if category_id:
      category = Category.objects.get(id=int(category_id))
      return queryset.filter(category__in=[category, *category.get_all_children()])
    return queryset

  def _filter_by_price(self, queryset, min_price, max_price):
    if min_price and max_price:
      return queryset.annotate(price=Case(
        When(variants__sale_price__isnull=False, then=F('variants__sale_price')),
        default=F('variants__actual_price'),
        output_field=PositiveIntegerField(),
      )).filter(
        price__gte=int(min_price),
        price__lte=int(max_price),
      ).distinct('pk')
    return queryset

  def _filter_by_brands(self, queryset, brand_ids):
    if brand_ids:
      return queryset.filter(brand__id__in=map(int, brand_ids))
    return queryset

  def get_queryset(self):
    queryset = Product.objects.all()

    category_id = self.request.query_params.get('category')
    queryset = self._filter_by_category(queryset, category_id)

    min_price = self.request.query_params.get('min_price')
    max_price = self.request.query_params.get('max_price')
    queryset = self._filter_by_price(queryset, min_price, max_price)

    brand_ids = self.request.query_params.getlist('brand_id[]', '')
    queryset = self._filter_by_brands(queryset, brand_ids)

    return queryset


class ProductDetailView(generics.RetrieveAPIView):
  permission_classes = (permissions.AllowAny,)
  queryset = Product.objects.all()
  serializer_class = ProductDetailSerializer
