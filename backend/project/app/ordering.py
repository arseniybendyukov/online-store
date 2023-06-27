from rest_framework.filters import OrderingFilter
from .models import Product

class ProductCustomOrdering(OrderingFilter):
  allowed_custom_filters = [
    'price',
    '-price',
    'rating',
    '-rating',
  ]

  def filter_queryset(self, request, queryset, view):
    param = request.query_params.get(self.ordering_param)
    
    if param in self.allowed_custom_filters:
      if param in ['price', '-price']:
        return sorted(
          queryset,
          key = lambda o: o.variants.first().price.get_price(),
          reverse = '-' in param
        )

      if param in ['rating', '-rating']:
        return sorted(
          queryset,
          key = lambda o: o.avg_rating,
          reverse = '-' in param
        )

    return queryset
