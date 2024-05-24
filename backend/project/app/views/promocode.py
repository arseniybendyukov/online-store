from rest_framework import generics, permissions
from app.models import Promocode
from app.serializers import PromocodeSerializer


class PromocodeDetailView(generics.RetrieveAPIView):
  permission_classes = (permissions.AllowAny,)
  queryset = Promocode.objects.filter(is_active=True)
  serializer_class = PromocodeSerializer
  lookup_field = 'name'
