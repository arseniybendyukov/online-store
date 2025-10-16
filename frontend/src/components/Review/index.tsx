import { Review as ProductReview, MyReview } from '../../types/data';
import { VotesCounter } from '../VotesCounter';
import { ReactComponent as Star } from '../../images/star.svg';
import css from './index.module.css';
import { Label } from '../Label';
import { NavPaths } from '../../navigation';
import { Link } from 'react-router-dom';
import { formatDate, getFullName } from '../../utils/data';
import { repeat } from '../../utils/arrays';
import { useVoteOnReviewMutation } from '../../redux/api';
import { CircleAvatar } from '../CircleAvatar';
import { useAppSelector } from '../../redux/store';
import { useCallback } from 'react';
import { toast } from 'react-toastify';

interface Props {
  review: ProductReview | MyReview;
}

export function Review({ review }: Props) {
  const user = useAppSelector((state) => state.userState.user);
  const [vote, { isLoading }] = useVoteOnReviewMutation();

  const voteWithRequiredAuth = useCallback(
    ({
      is_positive,
      review,
    }: {
      is_positive: boolean;
      review: number 
    }) => {
      if (user) {
        vote({ is_positive, review });
      } else {
        toast('Please log in to vote for reviews', { type: 'error' });
      }
    },
    [user]
  );

  return (
    <div className={css.container}>
      <CircleAvatar
        size='small'
        image={review.user.image}
        initials={review.user.first_name[0] + review.user.last_name[0]}
        color={review.user.color}
      />
      <div className={css.main}>
        <div className={css.info}>
          <div className={css.row}>
            <span className={css.user}>{getFullName(review.user)}</span>
            <span className={css.date}>{formatDate(review.created_at)}</span>
          </div>
          <div className={css.row}>
            <div className={css.stars}>
              {repeat(review.rating, () => <Star className={css.starSVG} />)}
            </div>
            {review.variant
            ? (
              <Label label='Option'>
                {review.variant}
              </Label>
            )
            : (
              <Link
                to={`${NavPaths.PRODUCT_DETAIL}/${review.product}`}
                className='link'
              >
                Show Product
              </Link>
            )}
          </div>
        </div>

        <p className={css.reviewText}>{review.text}</p>

        <VotesCounter
          votes={review.votes}
          isVotePositive={review.is_my_vote_positive}
          upVote={() => voteWithRequiredAuth({ is_positive: true, review: review.id })}
          downVote={() => voteWithRequiredAuth({ is_positive: false, review: review.id })}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}
