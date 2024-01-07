from rest_framework import generics, permissions
from app.serializers import AppealSerializer


class CreateAppealView(generics.CreateAPIView):
  permission_classes = (permissions.AllowAny,)
  serializer_class = AppealSerializer
