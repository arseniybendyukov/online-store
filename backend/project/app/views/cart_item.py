from rest_framework import viewsets, mixins
from app.mixins import MultiSerializerViewSetMixin
from rest_framework import permissions
from rest_framework.decorators import action
from app.models import CartItem
from app.serializers import (
  CartItemListSerializer,
  CreateCartItemSerializer,
  UpdateCartItemAmountSerializer,
)


class CartItemViewSet(MultiSerializerViewSetMixin,
                      mixins.ListModelMixin,
                      mixins.CreateModelMixin,
                      mixins.UpdateModelMixin,
                      mixins.DestroyModelMixin,
                      viewsets.GenericViewSet):
  permission_classes = (permissions.IsAuthenticated,)
  serializer_action_classes = {
    'list': CartItemListSerializer,
    'create': CreateCartItemSerializer,
    'partial_update': UpdateCartItemAmountSerializer,
  }

  def get_queryset(self):
    return CartItem.objects.filter(user=self.request.user).order_by('created_at')
