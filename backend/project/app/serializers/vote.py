from rest_framework import serializers
from app.models import Vote


class VoteSerializer(serializers.ModelSerializer):
  class Meta:
    model = Vote
    exclude = ('user',)
