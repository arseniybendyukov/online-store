from rest_framework import serializers
from app.models import Review
from .user import UserSmallSerializer


class ReviewSerializer(serializers.ModelSerializer):
  user = UserSmallSerializer()
  variant = serializers.CharField(source='variant.name')
  votes = serializers.ListField(source='get_votes')
  is_my_vote_positive = serializers.SerializerMethodField()

  def get_is_my_vote_positive(self, instance):
    user =  self.context['request'].user
    if user.is_authenticated:
      vote = Vote.objects.filter(user=user, review=instance).first()
      return vote.is_positive if vote else None
    return None

  class Meta:
    model = Review
    fields = '__all__'


class MyReviewSerializer(serializers.ModelSerializer):
  user = UserSmallSerializer()
  votes = serializers.ListField(source='get_votes')
  product = serializers.IntegerField(source='variant.product.id')
  is_my_vote_positive = serializers.SerializerMethodField()

  def get_is_my_vote_positive(self, instance):
    user =  self.context['request'].user
    vote = Vote.objects.filter(user=user, review=instance).first()
    return vote.is_positive if vote else None

  class Meta:
    model = Review
    fields = (
      'id',
      'user',
      'product',
      'created_at',
      'text',
      'votes',
      'rating',
      'is_my_vote_positive',
    )


class CreateReviewSerializer(serializers.ModelSerializer):
  def create(self, validated_data):
    return Review.objects.create(
      user=self.context['request'].user,
      variant=validated_data.get('variant'),
      text=validated_data.get('text'),
      rating=validated_data.get('rating'),
    )

  class Meta:
    model = Review
    fields = ('variant', 'text', 'rating',)
