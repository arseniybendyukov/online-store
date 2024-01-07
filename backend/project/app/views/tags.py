from rest_framework import viewsets, mixins
from app.mixins import MultiSerializerViewSetMixin
from rest_framework import permissions
from rest_framework.decorators import action
from app.models import ProductTag, BlogTag
from app.serializers import ProductTagSerializer, BlogTagSerializer


class TagViewSet(MultiSerializerViewSetMixin,
                 mixins.ListModelMixin,
                 viewsets.GenericViewSet):
  permission_classes = (permissions.AllowAny,)
  serializer_action_classes = {
    'product': ProductTagSerializer,
    'blog': BlogTagSerializer,
  }

  def get_queryset(self):
    if self.action == 'product':
      return ProductTag.objects.all()
    elif self.action == 'blog':
      return BlogTag.objects.all()
  
  @action(detail=False)
  def product(self, request):
    return super().list(request)

  @action(detail=False)
  def blog(self, request):
    return super().list(request)
