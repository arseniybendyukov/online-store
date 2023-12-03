from rest_framework import serializers
from app.models import OrderStageType


class OrderStageTypeSerializer(serializers.ModelSerializer):
  class Meta:
    model = OrderStageType
    fields = (
      'id',
      'name',
      'description',
      'is_payment_stage',
    )
