import { range } from '../../utils/arrays';
import { RatingStars } from '../RatingStars';
import { Row } from './Row';
import css from './index.module.css';

interface Props {
  avgRating: number;
  ratings: number[];
}

export function RatingStatsBar({ avgRating, ratings }: Props) {
  const rows = range(5).map((starsAmount) => {
    const value = ratings.filter((rating) => rating === starsAmount).length;
    const percentage = value / ratings.length * 100;

    return { starsAmount, value, percentage };
  });
  
  rows.reverse();

  return (
    <div className={css.container}>
      <div className={css.stats}>
        <span className={css.avgRating}>{avgRating}</span>
        <RatingStars onlyStars avgRating={avgRating} />
        <span className={css.reviewsCount}>
          {ratings.length} reviews
        </span>
      </div>
      <div className={css.rows}>
        {rows.map((row) => <Row key={row.starsAmount} {...row} /> )}
      </div>
    </div>
  );
}
