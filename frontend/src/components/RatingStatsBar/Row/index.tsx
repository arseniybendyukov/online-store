import { repeat } from '../../../utils';
import { ReactComponent as Star } from '../../../images/star.svg';
import css from './index.module.css';

interface Props {
  starsAmount: number;
  value: number;
  percentage: number;
}

export function Row({ starsAmount, value, percentage }: Props) {
  return (
    <div className={css.container}>
      <div className={css.starsAndValue}>
        <div className={css.stars}>
          {repeat(starsAmount, () => <Star className={css.starSVG} />)}
        </div>
        <span className={css.value}>{value}</span>
      </div>
      <div className={css.progressBar}>
        <div className={css.progressValue} style={{ width: `${percentage}%` }} />
      </div>
    </div>
  );
}
