from django.urls import path
from rest_framework_simplejwt.views import (
  TokenObtainPairView,
  TokenRefreshView,
)
from app import views

urlpatterns = [
  path('register/', views.UserRegisterationView.as_view()),
  path('login/', views.UserLoginView.as_view()),
  path('token/refresh/', TokenRefreshView.as_view()),
  path('logout/', views.UserLogoutView.as_view()),

  path('products/', views.ProductList.as_view()),
  path('product/<int:pk>', views.ProductDetail.as_view()),
  path('reviews/<int:pk>', views.ReviewList.as_view()),
  path('tags/', views.TagList.as_view()),
  path('min-max-price/', views.MinMaxPrice.as_view()),
  path('categories/', views.CategoryList.as_view()),
  path('brands/', views.BrandList.as_view()),
]
