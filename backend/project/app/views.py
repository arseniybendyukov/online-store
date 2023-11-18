from rest_framework import generics, views, permissions
from rest_framework import filters
from django_filters import rest_framework as django_filters_rest
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from django.db.models import Max
from .ordering import ProductCustomOrdering, ReviewCustomOrdering
from .email import send_activation_email
from .models import (
  Appeal,
  BlogPost,
  Product,
  ProductTag,
  BlogTag,
  Category,
  Brand,
  Review,
  CartItem,
  Variant,
  Order,
  Vote,
  User,
)
from .serializers import (
  UserDetailSerializer,
  UserRegisterationSerializer,
  ProductListSerializer,
  ProductTagSerializer,
  BlogTagSerializer,
  CategoryListSerializer,
  CategoryIdsSerializer,
  BrandListSerializer,
  ProductDetailSerializer,
  ReviewSerializer,
  SavedProductVariantSerializer,
  MyReviewSerializer,
  AddToCartSerializer,
  RemoveFromCartSerializer,
  CartItemListSerializer,
  UpdateCartAmountSerializer,
  UpdateUserSerializer,
  CreateOrderSerializer,
  OrderListSerializer,
  OrderDetailSerializer,
  AppealSerializer,
  VoteSerializer,
  CreateReviewSerializer,
  BlogListSerializer,
  BlogDetailSerializer,
  ActivateEmailSerializer,
  ResendActivationSerializer,
  UpdateAvatarSerializer,
  
)
from django.utils.http import urlsafe_base64_decode
from django.utils.encoding import force_str
from .email import token_generator
 

class ProductList(generics.ListAPIView):
  permission_classes = (permissions.AllowAny,)
  serializer_class = ProductListSerializer
  filter_backends = (
    django_filters_rest.DjangoFilterBackend,
    filters.SearchFilter,
    ProductCustomOrdering,
  )
  # todo: сделать поиск по категории и ее родителям
  search_fields = ('name', 'brand__name',)
  filterset_fields = ('tags__id',)
  
  def get_queryset(self):
    queryset = Product.objects.all()
    
    # Фильтрация по категории
    category_id = self.request.query_params.get('category')
    if category_id:
      category = Category.objects.get(id=int(category_id))
      queryset = queryset.filter(category__in=[category, *category.get_all_children()])
    

    # Фильтрация по минимальной и максимальной цене
    min_price = self.request.query_params.get('min_price')
    max_price = self.request.query_params.get('max_price')

    if min_price and max_price:
      filtered_objects = filter(
        # todo: (не только здесь) брать вариант с самой низкой ценой, а не первый в базе, по сути рандомный
        lambda o: int(min_price) <= o.variants.first().get_price() <= int(max_price),
        queryset
      )
      filtered_objects_ids = [o.id for o in filtered_objects]
      queryset = Product.objects.filter(id__in=filtered_objects_ids)


    # Фильтрация по брендам
    brand_ids = self.request.query_params.getlist('brand_id[]', '')
    
    if brand_ids:
      queryset = queryset.filter(brand__id__in=map(int, brand_ids))


    return queryset


class ProductDetailView(generics.RetrieveAPIView):
  permission_classes = (permissions.AllowAny,)
  queryset = Product.objects.all()
  serializer_class = ProductDetailSerializer


class AmIAuthenticated(generics.GenericAPIView):
  permission_classes = (permissions.AllowAny,)
  
  def get(self, request):
    return Response(request.user.is_authenticated)


class ReviewListView(generics.ListAPIView):
  serializer_class = ReviewSerializer
  filter_backends = [
    filters.OrderingFilter,
    ReviewCustomOrdering,
  ]
  ordering_fields = ['created_at', 'rating']

  def get_queryset(self):
    product = Product.objects.get(id=self.kwargs['pk'])
    return product.reviews


class ProductTagListView(generics.ListAPIView):
  permission_classes = (permissions.AllowAny,)
  queryset = ProductTag.objects.all()
  serializer_class = ProductTagSerializer


class BlogTagListView(generics.ListAPIView):
  permission_classes = (permissions.AllowAny,)
  queryset = BlogTag.objects.all()
  serializer_class = BlogTagSerializer


class MinMaxPriceView(views.APIView):
  permission_classes = (permissions.AllowAny,)
  def get(self, request):
    prices = [price.get_price() for price in Variant.objects.all()]
    return Response({
      'min': min(prices),
      'max': max(prices),
    })


class CategoryListView(generics.ListAPIView):
  permission_classes = (permissions.AllowAny,)
  queryset = Category.objects.filter(parent=None)
  serializer_class = CategoryListSerializer


class CategoryIdsView(generics.ListAPIView):
  permission_classes = (permissions.AllowAny,)
  queryset = Category.objects.filter(parent=None)
  serializer_class = CategoryIdsSerializer


class BrandListView(generics.ListAPIView):
  permission_classes = (permissions.AllowAny,)
  queryset = Brand.objects.all()
  serializer_class = BrandListSerializer


class UserRegisterView(generics.GenericAPIView):
  permission_classes = (permissions.AllowAny,)
  serializer_class = UserRegisterationSerializer

  def post(self, request, *args, **kwargs):
    serializer = self.get_serializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    user = serializer.save()

    send_activation_email(user, request)

    return Response(status=status.HTTP_201_CREATED)


class ActivateEmailView(generics.GenericAPIView):
  permission_classes = (permissions.AllowAny,)
  serializer_class = ActivateEmailSerializer

  def post(self, request, *args, **kwargs):
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


class ResendActivationView(generics.GenericAPIView):
  permission_classes = (permissions.AllowAny,)
  serializer_class = ResendActivationSerializer

  def post(self, request, *args, **kwargs):
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


class WhoAmIView(generics.GenericAPIView):
  permission_classes = (permissions.IsAuthenticated,)
  serializer_class = UserDetailSerializer

  def get_serializer_context(self):
    context = super(WhoAmIView, self).get_serializer_context()
    context.update({'request': self.request})
    return context

  def get(self, request, *args, **kwargs):
    serializer = self.get_serializer(request.user)
    return Response(serializer.data, status=status.HTTP_200_OK)


class MyCountsView(generics.GenericAPIView):
  permission_classes = (permissions.IsAuthenticated,)

  def get(self, request, *args, **kwargs):
    saved_product_variants_count = request.user.saved_product_variants.count()
    cart_products_count = CartItem.objects.filter(user=request.user).count()

    data = {
      'saved_product_variants_count': saved_product_variants_count,
      'cart_products_count': cart_products_count,
    }

    return Response(data, status=status.HTTP_200_OK)


class SavedProductVariantsView(generics.ListAPIView):
  permission_classes = (permissions.IsAuthenticated,)
  serializer_class = SavedProductVariantSerializer

  def get_queryset(self):
    return self.request.user.saved_product_variants


class MyReviewsView(generics.ListAPIView):
  permission_classes = (permissions.IsAuthenticated,)
  serializer_class = MyReviewSerializer

  def get_queryset(self):
    return Review.objects.filter(user=self.request.user)


class AddToSavedView(generics.UpdateAPIView):
  permission_classes = (permissions.IsAuthenticated,)

  def update(self, request, *args, **kwargs):
    variant = Variant.objects.filter(id=request.data['variant_id']).first()
    if variant:
      if not request.user.saved_product_variants.filter(id=variant.id).first():
        request.user.saved_product_variants.add(variant)
        return Response(status=status.HTTP_200_OK)
      return Response(status=status.HTTP_400_BAD_REQUEST)
    return Response(status=status.HTTP_400_BAD_REQUEST)


class RemoveFromSavedView(generics.UpdateAPIView):
  permission_classes = (permissions.IsAuthenticated,)

  def patch(self, request, *args, **kwargs):
    variant = Variant.objects.filter(id=request.data['variant_id']).first()
    if variant:
      if request.user.saved_product_variants.filter(id=variant.id).first():
        request.user.saved_product_variants.remove(variant)
        return Response(status=status.HTTP_200_OK)
      return Response(status=status.HTTP_400_BAD_REQUEST)
    return Response(status=status.HTTP_400_BAD_REQUEST)


class ToggleSavedView(generics.GenericAPIView):
  permission_classes = (permissions.IsAuthenticated,)

  def patch(self, request, *args, **kwargs):
    variant = Variant.objects.filter(id=request.data['variant_id']).first()
    if variant:
      if request.user.saved_product_variants.filter(id=variant.id).first():
        request.user.saved_product_variants.remove(variant)
      else:
        request.user.saved_product_variants.add(variant)
      return Response(status=status.HTTP_200_OK)
    return Response(status=status.HTTP_400_BAD_REQUEST)


class CartItemListView(generics.ListAPIView):
  permission_classes = (permissions.IsAuthenticated,)
  serializer_class = CartItemListSerializer

  def get_queryset(self):
    return CartItem.objects.filter(user=self.request.user).order_by('created_at')


class AddToCartView(generics.GenericAPIView):
  permission_classes = (permissions.IsAuthenticated,)
  serializer_class = AddToCartSerializer

  def post(self, request, *args, **kwargs):
    serializer = self.get_serializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    serializer.save()
    return Response(status=status.HTTP_201_CREATED)


class RemoveFromCartView(generics.GenericAPIView):
  permission_classes = (permissions.IsAuthenticated,)
  serializer_class = RemoveFromCartSerializer

  def delete(self, request, *args, **kwargs):
    serializer = self.get_serializer(data=request.data)
    serializer.is_valid(raise_exception=True)

    variant_id = serializer.validated_data.get('variant_id')

    CartItem.objects.filter(
      user=request.user,
      variant__id=variant_id,
    ).delete()

    return Response(status=status.HTTP_200_OK)


class UpdateCartAmountView(generics.UpdateAPIView):
  permission_classes = (permissions.IsAuthenticated,)
  serializer_class = UpdateCartAmountSerializer

  def get_queryset(self):
    return CartItem.objects.filter(user=self.request.user)


class UpdateUserView(generics.UpdateAPIView):
  permission_classes = (permissions.IsAuthenticated,)
  serializer_class = UpdateUserSerializer

  def get_object(self):
    return self.request.user


class UpdateAvatarView(generics.UpdateAPIView):
  permission_classes = (permissions.IsAuthenticated,)
  serializer_class = UpdateAvatarSerializer

  def get_object(self):
    return self.request.user


class CreateOrderView(generics.CreateAPIView):
  permission_classes = (permissions.IsAuthenticated,)
  serializer_class = CreateOrderSerializer


class OrderListView(generics.ListAPIView):
  permission_classes = (permissions.IsAuthenticated,)
  serializer_class = OrderListSerializer

  def get_queryset(self):
    return Order.objects.filter(user=self.request.user)


class OrderDetail(generics.RetrieveAPIView):
  permission_classes = (permissions.IsAuthenticated,)
  serializer_class = OrderDetailSerializer
  
  def get_queryset(self):
    return Order.objects.filter(user=self.request.user)


class CreateAppealView(generics.CreateAPIView):
  permission_classes = (permissions.AllowAny,)
  serializer_class = AppealSerializer


class VoteView(generics.GenericAPIView):
  permission_classes = (permissions.IsAuthenticated,)
  serializer_class = VoteSerializer

  def post(self, request, *args, **kwargs):
    data = request.data
    serializer = self.get_serializer(data=request.data)
    serializer.is_valid(raise_exception=True)

    vote = Vote.objects.filter(user=request.user, review__id=data['review']).first()
    
    if vote:
      if vote.is_positive == data['is_positive']:
        vote.delete()
      else:
        vote.is_positive = data['is_positive']
        vote.save()
    else:
      Vote.objects.create(
        user=request.user,
        review=Review.objects.get(id=data['review']),
        is_positive=data['is_positive']
      )

    return Response(status=status.HTTP_200_OK)


class CreateReviewView(generics.CreateAPIView):
  permission_classes = (permissions.IsAuthenticated,)
  serializer_class = CreateReviewSerializer


class BlogListView(generics.ListAPIView):
  permission_classes = (permissions.AllowAny,)
  queryset = BlogPost.objects.all()
  serializer_class = BlogListSerializer
  filter_backends = (django_filters_rest.DjangoFilterBackend,)
  filterset_fields = ('tags__id',)


class BlogDetailView(generics.RetrieveAPIView):
  permission_classes = (permissions.AllowAny,)
  queryset = BlogPost.objects.all()
  serializer_class = BlogDetailSerializer
