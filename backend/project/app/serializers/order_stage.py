from rest_framework import serializers
from app.models import OrderStage
from .order_stage_type import OrderStageTypeSerializer


class OrderStageSerializer(serializers.ModelSerializer):
  stage_type = OrderStageTypeSerializer()

  class Meta:
    model = OrderStage
    exclude = ('order',)
