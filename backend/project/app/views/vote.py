from rest_framework import generics, views, permissions
from rest_framework.response import Response
from rest_framework import status
from app.models import Vote, Review
from app.serializers import VoteSerializer


class CreateVoteView(generics.GenericAPIView):
  permission_classes = (permissions.IsAuthenticated,)
  serializer_class = VoteSerializer

  def post(self, request, *args, **kwargs):
    data = request.data
    serializer = self.get_serializer(data=request.data)
    serializer.is_valid(raise_exception=True)

    vote = Vote.objects.filter(user=request.user, review__id=data['review']).first()
    
    if vote:
      if vote.is_positive == data['is_positive']:
        vote.delete()
      else:
        vote.is_positive = data['is_positive']
        vote.save()
    else:
      Vote.objects.create(
        user=request.user,
        review=Review.objects.get(id=data['review']),
        is_positive=data['is_positive']
      )

    return Response(status=status.HTTP_200_OK)
