import { Review as ProductReview, MyReview } from '../../types/data';
import { VotesCounter } from '../VotesCounter';
import { ReactComponent as Star } from '../../images/star.svg';
import css from './index.module.css';
import { formatDate, repeat } from '../../utils';
import { Label } from '../Label';
import { NavPaths } from '../../navigation';
import { Link } from 'react-router-dom';

interface Props {
  review: ProductReview | MyReview;
}

export function Review({ review }: Props) {
  return (
    <div className={css.container}>
      <div className={css.avatar}>
        <div className={css.image}></div>
      </div>
      <div className={css.main}>
        <div className={css.info}>
          <div className={css.row}>
            <span className={css.user}>Иван Иванов</span>
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
                {/* todo: сделать "Перейти к !отзыву!" */}
                Перейти к продукту
              </Link>
            )}
          </div>
        </div>
        <p>{review.text}</p>
        <VotesCounter votes={review.votes} />
      </div>
    </div>
  );
}
