from rest_framework import viewsets, mixins
from app.mixins import MultiSerializerViewSetMixin
from rest_framework import permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status
from app.models import Order
from app.serializers import (
  OrderListSerializer,
  OrderDetailSerializer,
  CreateOrderSerializer,
)

class OrderViewSet(MultiSerializerViewSetMixin,
                   mixins.ListModelMixin,
                   mixins.RetrieveModelMixin,
                   mixins.CreateModelMixin,
                   viewsets.GenericViewSet):
  permission_classes = (permissions.IsAuthenticated,)
  serializer_action_classes = {
    'list': OrderListSerializer,
    'retrieve': OrderDetailSerializer,
    'create': CreateOrderSerializer,
  }

  def get_queryset(self):
    return Order.objects.filter(user=self.request.user)

  @action(detail=True, methods=['patch'])
  def cancel(self, request, pk=None):
    order = self.get_object()
    if not order.is_cancelled:
      order.is_cancelled = True
      order.save()
      return Response(status=status.HTTP_200_OK)
    return Response(status=status.HTTP_400_BAD_REQUEST)
