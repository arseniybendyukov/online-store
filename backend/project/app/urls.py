from django.urls import path
from rest_framework_simplejwt.views import (
  TokenObtainPairView,
  TokenRefreshView,
  TokenBlacklistView,
)
from .serializers import CustomJWTSerializer
from app import views

urlpatterns = [
  path('create-appeal/', views.CreateAppealView.as_view()),

  path('register/', views.UserRegisterView.as_view()),
  path('token/obtain/', TokenObtainPairView.as_view(serializer_class=CustomJWTSerializer)),
  path('token/refresh/', TokenRefreshView.as_view()),
  path('who-am-i/', views.WhoAmIView.as_view()),
  path('am-i-authenticated/', views.AmIAuthenticated.as_view()),
  path('logout/', TokenBlacklistView.as_view()),
  path('update-me/', views.UpdateUserView.as_view()),
  path('activate-email/', views.ActivateEmailView.as_view()),
  path('resend-activation/', views.ResendActivationView.as_view()),

  path('products/', views.ProductList.as_view()),
  path('product/<int:pk>', views.ProductDetailView.as_view()),
  path('reviews/<int:pk>', views.ReviewListView.as_view()),
  path('product-tags/', views.ProductTagListView.as_view()),
  path('min-max-price/', views.MinMaxPriceView.as_view()),
  path('categories/', views.CategoryListView.as_view()),
  path('category-ids/', views.CategoryIdsView.as_view()),
  path('brands/', views.BrandListView.as_view()),
  
  path('my-counts/', views.MyCountsView.as_view()),
  
  path('saved-products/', views.SavedProductsView.as_view()),
  path('add-to-saved/<int:pk>', views.AddToSavedView.as_view()),
  path('remove-from-saved/<int:pk>', views.RemoveFromSavedView.as_view()),

  path('my-reviews/', views.MyReviewsView.as_view()),

  path('cart/', views.CartItemListView.as_view()),
  path('add-to-cart/', views.AddToCartView.as_view()),
  path('remove-from-cart/<int:pk>', views.RemoveFromCartView.as_view()),
  path('update-cart-amount/<int:pk>', views.UpdateCartAmountView.as_view()),

  path('orders/', views.OrderListView.as_view()),
  path('create-order/', views.CreateOrderView.as_view()),
  path('order/<int:pk>', views.OrderDetail.as_view()),

  path('vote/', views.VoteView.as_view()),
  path('create-review/', views.CreateReviewView.as_view()),

  path('blog/', views.BlogListView.as_view()),
  path('blog/<int:pk>', views.BlogDetailView.as_view()),
  path('blog-tags/', views.BlogTagListView.as_view()),
]
