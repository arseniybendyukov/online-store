from rest_framework import viewsets, mixins
from app.mixins import MultiSerializerViewSetMixin
from rest_framework import permissions
from rest_framework.decorators import action
from app.models import Brand
from app.serializers import BrandImageListSerializer, BrandCountListSerializer


class BrandViewSet(MultiSerializerViewSetMixin,
                   mixins.ListModelMixin,
                   viewsets.GenericViewSet):
  permission_classes = (permissions.AllowAny,)
  queryset = Brand.objects.all()
  serializer_action_classes = {
    'images': BrandImageListSerializer,
    'counts': BrandCountListSerializer,
  }

  @action(detail=False)
  def images(self, request):
    return super().list(request)

  @action(detail=False)
  def counts(self, request):
    return super().list(request)
