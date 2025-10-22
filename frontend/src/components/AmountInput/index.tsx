import { SetState } from '../../types/common';
import { ReactComponent as Increment } from '../../images/increment.svg';
import { ReactComponent as Decrement } from '../../images/decrement.svg';
import css from './index.module.css';

interface Props {
  amount: number;
  setAmount: SetState<number>;
  isBig?: boolean;
}

export const AmountInput = ({ amount, setAmount, isBig = false }: Props) => (
  <div
    className={`${css.container} ${isBig ? css.big : ''}`}
    onClick={(e) => e.preventDefault()}
  >
    <button
      className={css.button}
      onClick={() => setAmount((prevAmount) => Math.max(prevAmount - 1, 1))}
      disabled={amount <= 1}
    >
      <Decrement />
    </button>
    <input
      className={css.input}
      type='number'
      min='1'
      max='100'
      value={amount}
      onChange={(e) => setAmount(Math.min(Math.max(Number(e.target.value), 1), 100))}
    />
    <button
      className={css.button}
      onClick={() => setAmount((prevAmount) => Math.min(prevAmount + 1, 100))}
    >
      <Increment />
    </button>
  </div>
);
