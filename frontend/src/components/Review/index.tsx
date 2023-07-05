import { Review as IReview } from '../../types/data';
import { VotesCounter } from '../VotesCounter';
import { ReactComponent as Star } from '../../images/star.svg';
import css from './index.module.css';
import { formatDate, repeat } from '../../utils';
import { Label } from '../Label';
import { useState } from 'react';

interface Props {
  review: IReview;
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
            <Label label='Вариант'>
              {review.variant}
            </Label>
          </div>
        </div>
        <p>{review.text}</p>
        <VotesCounter value={review.votes} />
      </div>
    </div>
  );
}
