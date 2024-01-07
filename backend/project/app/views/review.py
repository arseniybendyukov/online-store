from rest_framework import generics, viewsets, mixins, permissions
from app.mixins import MultiSerializerViewSetMixin
from rest_framework.filters import OrderingFilter
from app.ordering import ReviewCustomOrdering
from app.models import Review, Product
from app.serializers import (
  ReviewSerializer,
  CreateReviewSerializer,
  UserReviewSerializer,
)


class PublicReviewListView(generics.ListAPIView):
  permission_classes = (permissions.AllowAny,)
  serializer_class = ReviewSerializer
  filter_backends = (
    OrderingFilter,
    ReviewCustomOrdering,
  )
  ordering_fields = ['created_at', 'rating']

  def get_queryset(self):
    product = Product.objects.get(id=self.kwargs['pk'])
    return product.reviews


class PrivateReviewViewSet(MultiSerializerViewSetMixin,
                           mixins.ListModelMixin,
                           mixins.CreateModelMixin,
                           viewsets.GenericViewSet):
  permission_classes = (permissions.IsAuthenticated,)
  serializer_action_classes = {
    'list': UserReviewSerializer,
    'create': CreateReviewSerializer,
  }

  def get_queryset(self):
    return Review.objects.filter(user=self.request.user)
