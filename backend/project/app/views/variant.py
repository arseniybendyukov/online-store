from rest_framework import generics, viewsets, mixins
from rest_framework import permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status
from app.models import Variant
from app.serializers import (
  SavedVariantSerializer,
  CartVariantSerializer,
)


class SavedVariantViewSet(viewsets.GenericViewSet,
                          mixins.ListModelMixin):
  permission_classes = (permissions.IsAuthenticated,)
  serializer_class = SavedVariantSerializer

  def get_queryset(self):
    if self.action == 'list':
      return self.request.user.saved_product_variants
    return Variant.objects.all()

  @action(detail=True, methods=['patch'])
  def remove(self, request, pk=None):
    user = request.user
    variant = self.get_object()
    if variant in user.saved_product_variants.all():
      user.saved_product_variants.remove(variant)
      return Response(status=status.HTTP_200_OK)
    return Response(status=status.HTTP_400_BAD_REQUEST)

  @action(detail=True, methods=['patch'])
  def toggle(self, request, pk=None):
    user = request.user
    variant = self.get_object()
    if variant in user.saved_product_variants.all():
      user.saved_product_variants.remove(variant)
    else:
      user.saved_product_variants.add(variant)
    return Response(status=status.HTTP_200_OK)


class LocalCartVariantListView(generics.ListAPIView):
  permission_classes = (permissions.AllowAny,)
  serializer_class = CartVariantSerializer

  def get_queryset(self):
    variant_ids = self.request.query_params.getlist('variant_id[]', '')
    return Variant.objects.filter(id__in=map(int, variant_ids))


class MinMaxPriceView(generics.GenericAPIView):
  permission_classes = (permissions.AllowAny,)
  queryset = Variant.objects.all()

  def get(self, request):
    prices = [price.get_price() for price in self.get_queryset()]
    return Response({
      'min': min(prices),
      'max': max(prices),
    })
