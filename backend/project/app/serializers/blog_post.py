from rest_framework import serializers
from app.models import BlogPost


class BlogListSerializer(serializers.ModelSerializer):
  class Meta:
    model = BlogPost
    exclude = ('text',)
    depth = 1


class BlogDetailSerializer(serializers.ModelSerializer):
  class Meta:
    model = BlogPost
    fields = '__all__'
    depth = 1
