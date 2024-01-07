from rest_framework import viewsets, mixins
from app.mixins import MultiSerializerViewSetMixin
from rest_framework import permissions
from django_filters.rest_framework import DjangoFilterBackend
from app.models import BlogPost
from app.serializers import BlogListSerializer, BlogDetailSerializer


class BlogViewSet(MultiSerializerViewSetMixin,
                  mixins.ListModelMixin,
                  mixins.RetrieveModelMixin,
                  viewsets.GenericViewSet):
  permission_classes = (permissions.AllowAny,)
  queryset = BlogPost.objects.all()
  serializer_action_classes = {
    'list': BlogListSerializer,
    'retrieve': BlogDetailSerializer,
  }
  filter_backends = (DjangoFilterBackend,)
  filterset_fields = ('tags__id',)
