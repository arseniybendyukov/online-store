from django.urls import path
from app import views

urlpatterns = [
  path('products/', views.ProductList.as_view()),
  path('tags/', views.TagList.as_view()),
  path('min-max-price/', views.MinMaxPrice.as_view()),
  path('categories/', views.CategoryList.as_view()),
  path('brands/', views.BrandList.as_view()),
]
