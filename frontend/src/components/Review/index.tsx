import { Review as ProductReview, MyReview } from '../../types/data';
import { VotesCounter } from '../VotesCounter';
import { ReactComponent as Star } from '../../images/star.svg';
import css from './index.module.css';
import { Label } from '../Label';
import { NavPaths } from '../../navigation';
import { Link } from 'react-router-dom';
import { formatDate, getFullName } from '../../utils/data';
import { repeat } from '../../utils/arrays';
import { useVoteOnReviewMutation } from '../../redux/apis/productsApi';
import { CircleAvatar } from '../CircleAvatar';

interface Props {
  review: ProductReview | MyReview;
}

export function Review({ review }: Props) {
  const [vote, { isLoading }] = useVoteOnReviewMutation();

  return (
    <div className={css.container}>
      <CircleAvatar
        sizeType='small'
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
              <Label label='Вариант'>
                {review.variant}
              </Label>
            )
            : (
              <Link
                to={`${NavPaths.PRODUCT_DETAIL}/${review.product}`}
                className='link'
              >
                Перейти к продукту
              </Link>
            )}
          </div>
        </div>

        <p>{review.text}</p>

        <VotesCounter
          votes={review.votes}
          isVotePositive={review.is_my_vote_positive}
          upVote={() => vote({ is_positive: true, review: review.id })}
          downVote={() => vote({ is_positive: false, review: review.id })}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}
