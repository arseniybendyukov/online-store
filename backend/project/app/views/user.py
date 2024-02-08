from rest_framework import generics, viewsets, mixins
from app.mixins import MultiSerializerViewSetMixin
from rest_framework import permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status
from django.utils.http import urlsafe_base64_decode
from django.utils.encoding import force_str
from app.models import User
from app.serializers import (
  RegisterUserSerializer,
  UserDetailSerializer,
  UpdateUserSerializer,
  UpdateAvatarSerializer,
  ActivateEmailSerializer,
  ResendEmailActivationSerializer,
)
from app.email import send_activation_email, token_generator


class UserViewSet(MultiSerializerViewSetMixin,
                  mixins.RetrieveModelMixin,
                  mixins.CreateModelMixin,
                  mixins.UpdateModelMixin,
                  viewsets.GenericViewSet):
  serializer_action_classes = {
    'register': RegisterUserSerializer,
    'who_am_i': UserDetailSerializer,
    'partial_update': UpdateUserSerializer,
    'update_avatar': UpdateAvatarSerializer,
  }

  def get_permissions(self):
    if self.action == 'register':
      permission_classes = (permissions.AllowAny,)
    else:
      permission_classes = (permissions.IsAuthenticated,)
    return [permission() for permission in permission_classes]
  
  def get_object(self):
    return self.request.user
  
  @action(detail=False, methods=['post'])
  def register(self, request):
    serializer = self.get_serializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    user = serializer.save()
    send_activation_email(user, request)
    headers = self.get_success_headers(serializer.data)
    return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
  
  @action(detail=False, url_path='who-am-i')
  def who_am_i(self, request):
    return super().retrieve(request)

  @action(detail=False, methods=['patch'], url_path='update-avatar')
  def update_avatar(self, request):
    return super().partial_update(request)


class EmailViewSet(MultiSerializerViewSetMixin,
                   viewsets.GenericViewSet):
  permission_classes = (permissions.AllowAny,)
  serializer_action_classes = {
    'activate': ActivateEmailSerializer,
    'resend': ResendEmailActivationSerializer,
  }

  @action(detail=False, methods=['post'])
  def activate(self, request, *args, **kwargs):
    serializer = self.get_serializer(data=request.data)
    serializer.is_valid(raise_exception=True)

    uidb64 = serializer.validated_data.get('uidb64')
    token = serializer.validated_data.get('token')

    try:
      uid = force_str(urlsafe_base64_decode(uidb64))
      user = User.objects.get(pk=uid)
    except Exception as e:
      user = None

    if user and token_generator.check_token(user, token):
      user.is_email_verified = True
      user.save()
      return Response(status=status.HTTP_200_OK)

    return Response(status=status.HTTP_400_BAD_REQUEST)

  @action(detail=False, methods=['post'])
  def resend(self, request, *args, **kwargs):
    serializer = self.get_serializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    
    email = serializer.validated_data.get('email')

    try:
      user = User.objects.get(email=email)
    except Exception as e:
      user = None

    if user:
      send_activation_email(user, request)
      return Response(status=status.HTTP_200_OK)
    
    return Response(status=status.HTTP_404_NOT_FOUND)


class AmIAuthenticated(generics.GenericAPIView):
  permission_classes = (permissions.AllowAny,)
  
  def get(self, request):
    return Response(request.user.is_authenticated)
