import { ReactComponent as Star } from '../../images/star.svg';
import { repeat } from '../../utils';
import css from './index.module.css';

interface Props {
  avgRating: number;
  reviewsCount: number;
}

const fiveStars = repeat(5, () => <Star className={css.starSVG} />);

export function RatingStars({ avgRating, reviewsCount }: Props) {
  return (
    <div className={css.body}>
      <span className={css.ratingValue}>{avgRating}</span>
      <div className={css.stars}>
        <div className={css.uncolored}>
          {fiveStars}
        </div>
        <div
          className={css.colored}
          style={{width: `calc(${avgRating} / 5 * 100%)`}}
        >
          {fiveStars}
        </div>
      </div>
      <span className={css.reviewsCount}>({reviewsCount})</span>
    </div>
  );
}
