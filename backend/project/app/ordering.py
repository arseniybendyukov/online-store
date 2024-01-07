from rest_framework.filters import OrderingFilter
from .models import Product


def create_custom_ordering_filter(filter_objects):
  class CustomOrdering(OrderingFilter):
    def filter_queryset(self, request, queryset, view):
      param = request.query_params.get(self.ordering_param)
      for [filter_object_param, filter_object_callback] in filter_objects:
        if param in [filter_object_param, f'-{filter_object_param}']:
          return sorted(
            queryset,
            key = filter_object_callback,
            reverse = '-' in param,
          )
      return queryset
  return CustomOrdering


ProductCustomOrdering = create_custom_ordering_filter([
  ['rating', lambda instance: instance.avg_rating],
  [
    'price',
    lambda instance: instance.variants.annotate(
      price=Min(Case(
        When(sale_price__isnull=False, then=F('sale_price')),
        default=F('actual_price'),
        output_field=PositiveIntegerField(),
      ))
    ).price
  ],
])


ReviewCustomOrdering = create_custom_ordering_filter([
  ['votes', lambda instance: instance.votes_count]
])
