from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import (
  TokenObtainPairView,
  TokenRefreshView,
  TokenBlacklistView,
)
from .serializers import CustomJWTSerializer
from app import views


router = DefaultRouter()
router.register(r'blogs', views.BlogViewSet, basename='blog')
router.register(r'brands', views.BrandViewSet, basename='brand')
router.register(r'categories', views.CategoryViewSet, basename='category')
router.register(r'orders', views.OrderViewSet, basename='order')
router.register(r'cart-items', views.CartItemViewSet, basename='cart-item')
router.register(r'private-reviews', views.PrivateReviewViewSet, basename='private-review')
router.register(r'saved-variants', views.SavedVariantViewSet, basename='saved-variant')
router.register(r'user', views.UserViewSet, basename='user')
router.register(r'email', views.EmailViewSet, basename='email')
router.register(r'tags', views.TagViewSet, basename='tag')


urlpatterns = [
  path('', include(router.urls)),

  # Каталог
  path('products/', views.ProductListView.as_view()),
  path('products/<int:pk>', views.ProductDetailView.as_view()),
  path('min-max-price/', views.MinMaxPriceView.as_view()),

  # Отзывы
  path('public-reviews/<int:pk>', views.PublicReviewListView.as_view()),
  path('create-vote/', views.CreateVoteView.as_view()),

  # Корзина
  path('local-cart-variants/', views.LocalCartVariantListView().as_view()),

  # Контакты
  path('create-appeal/', views.CreateAppealView.as_view()),

  # Система аутентификации
  path('token/obtain/', TokenObtainPairView.as_view(serializer_class=CustomJWTSerializer)),
  path('token/refresh/', TokenRefreshView.as_view()),
  path('logout/', TokenBlacklistView.as_view()),
]
