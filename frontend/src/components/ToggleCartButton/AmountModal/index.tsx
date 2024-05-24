import { ReactNode } from 'react';
import css from './index.module.css';
import { ReactComponent as Cross } from '../../images/cross.svg';
import { SetState } from '../../../types/common';
import { Button } from '../../Button';
import { AmountInput } from '../../AmountInput';

interface Props {
  isOpened: boolean;
  close: () => void;
  amount: number;
  setAmount: SetState<number>;
  onClick: () => void;
}

export function AmountModal({
  isOpened,
  close,
  amount,
  setAmount,
  onClick,
}: Props) {
  return (
    <div
      onClick={(e) => {e.preventDefault(); close()}}
      className={`${css.wrapper} ${isOpened ? css.opened : ''}`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={css.container}
      >
        <div className={css.content}>
          <h2 className='h4'>Выберите количество товара</h2>

          <AmountInput
            amount={amount}
            setAmount={setAmount}
            isBig
          />

          <Button
            onClick={(e) => {e.preventDefault(); onClick()}}
            state={{ default: { text: 'В корзину', icon: undefined } }}
            isBig
          />
        </div>
      </div>
    </div>
  );
}
