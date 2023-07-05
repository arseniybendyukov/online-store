import { ReactComponent as Arrow } from '../../images/arrow.svg';
import css from './index.module.css';

type VotesCountState = 'positive' | 'neutral' | 'negative';

interface Props {
  value: number;
}

export function VotesCounter({ value }: Props) {
  // todo: подкрашивать стрелки в зависимости от выбора пользователя

  let votesCountState: VotesCountState = 'neutral';
  let formattedValue = `${value}`;
  let stateClass = '';

  if (value > 0) {
    formattedValue = `+${formattedValue}`;
    votesCountState = 'positive';
    stateClass = css.positive;
  } else if (value < 0) {
    votesCountState = 'negative';
    stateClass = css.negative;
  }

  return (
    <div className={css.container}>
      <button className={`${css.button} ${css.decrement}`}>
        <Arrow className={css.arrowSVG} />
      </button>
      <span className={`${css.value} ${stateClass}`}>
        {formattedValue}
      </span>
      <button className={`${css.button} ${css.increment}`}>
        <Arrow className={css.arrowSVG} />
      </button>
    </div>
  );
}
