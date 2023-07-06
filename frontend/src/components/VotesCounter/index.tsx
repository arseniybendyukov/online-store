import { ReactComponent as Arrow } from '../../images/arrow.svg';
import { HoverTitle } from '../HoverTitle';
import css from './index.module.css';

type VotesCountState = 'positive' | 'neutral' | 'negative';

interface Props {
  votes: [number, number];
}

export function VotesCounter({ votes }: Props) {
  // todo: подкрашивать стрелки в зависимости от выбора пользователя

  const [positive, negative] = votes;
  const value = positive - negative;

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
    <HoverTitle title={`${positive} плюсов; ${negative} минусов`}>
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
    </HoverTitle>
  );
}
