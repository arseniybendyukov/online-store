import { SetState } from '../../types/common';
import { ReactComponent as Increment } from '../../images/increment.svg';
import { ReactComponent as Decrement } from '../../images/decrement.svg';
import css from './index.module.css';

interface Props {
  amount: number;
  setAmount: SetState<number>;
}

export function AmountInput({ amount, setAmount }: Props) {
  return (
    <div className={css.container}>
      <button
        className={css.button}
        onClick={() => setAmount((prevAmount) => prevAmount - 1)}
      >
        <Decrement />
      </button>
      <input
        className={css.input}
        type='number'
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
      />
      <button
        className={css.button}
        onClick={() => setAmount((prevAmount) => prevAmount + 1)}
      >
        <Increment />
      </button>
    </div>
  );
}
