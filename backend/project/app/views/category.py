from rest_framework import viewsets, mixins
from app.mixins import MultiSerializerViewSetMixin
from rest_framework import permissions
from rest_framework.decorators import action
from app.models import Category
from app.serializers import CategoryTreeListSerializer, CategoryRootSerializer


class CategoryViewSet(MultiSerializerViewSetMixin,
                      mixins.ListModelMixin,
                      viewsets.GenericViewSet):
  permission_classes = (permissions.AllowAny,)
  queryset = Category.objects.filter(parent=None)
  serializer_action_classes = {
    'tree': CategoryTreeListSerializer,
    'roots': CategoryRootSerializer,
  }

  @action(detail=False)
  def tree(self, request):
    return super().list(request)

  @action(detail=False)
  def roots(self, request):
    return super().list(request)
