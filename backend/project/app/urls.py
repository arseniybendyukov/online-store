from django.urls import path
from rest_framework_simplejwt.views import (
  TokenObtainPairView,
  TokenRefreshView,
  TokenBlacklistView,
)
from app import views

urlpatterns = [
  path('register/', views.UserRegisterView.as_view()),
  path('token/obtain/', TokenObtainPairView.as_view()),
  path('token/refresh/', TokenRefreshView.as_view()),
  path('who-am-i/', views.WhoAmIView.as_view()),
  path('logout/', TokenBlacklistView.as_view()),
  path('update-me/', views.UpdateUserView.as_view()),

  path('products/', views.ProductList.as_view()),
  path('product/<int:pk>', views.ProductDetail.as_view()),
  path('reviews/<int:pk>', views.ReviewList.as_view()),
  path('tags/', views.TagList.as_view()),
  path('min-max-price/', views.MinMaxPrice.as_view()),
  path('categories/', views.CategoryList.as_view()),
  path('brands/', views.BrandList.as_view()),
  
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
]
