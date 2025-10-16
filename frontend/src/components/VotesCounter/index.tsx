import { ReactComponent as Arrow } from '../../images/arrow.svg';
import { HoverTitle } from '../HoverTitle';
import { Spinner } from '../Spinner';
import css from './index.module.css';

type VotesCountState = 'positive' | 'neutral' | 'negative';

interface Props {
  votes: [number, number];
  isVotePositive: boolean | null;
  upVote: () => void;
  downVote: () => void;
  isLoading: boolean;
}

export function VotesCounter({
  votes,
  isVotePositive,
  upVote,
  downVote,
  isLoading,
}: Props) {
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
    <HoverTitle title={`${positive} upvotes; ${negative} downvotes`}>
      <div className={css.container}>
        <button onClick={downVote} className={`${css.button} ${isVotePositive === false ? css.negative : ''}`}>
          <Arrow className={css.arrowSVG} />
        </button>
        <span className={`${css.value} ${stateClass}`}>
          {
            isLoading
            ? <Spinner size={20} thickness={2} />
            : formattedValue
          }
        </span>
        <button onClick={upVote} className={`${css.button} ${css.increment} ${isVotePositive === true ? css.positive : ''}`}>
          <Arrow className={css.arrowSVG} />
        </button>
      </div>
    </HoverTitle>
  );
}
