import { SetState } from '../../types/common';
import { range } from '../../utils/arrays';
import css from './index.module.css';
import { ReactComponent as Star } from '../../images/star.svg';

interface Props {
  selectedRating: number;
  setSelectedRating: SetState<number>;
  isTouched?: boolean;
  error?: string;
}

export function RadioStars({
  selectedRating,
  setSelectedRating,
  isTouched,
  error,
}: Props) {
  const isError = isTouched && error;

  return (
    <div className={css.container}>
      {range(5).map((rating) => (
        <div
          key={rating}
          className={`${css.option} ${rating <= selectedRating ? css.active : ''}`}
          onClick={() => setSelectedRating(rating)}
        >
          <Star className={css.starSVG} />
        </div>
      ))}
      
      {isError ? (
        <span className='error'>{error}</span>
      ) : null}
    </div>
  );
}
