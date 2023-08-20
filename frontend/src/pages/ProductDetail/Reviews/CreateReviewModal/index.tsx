import { ReactNode, useEffect } from 'react';
import css from './index.module.css';
import { ReactComponent as Cross } from '../../../../images/cross.svg';

interface Props {
  isOpened: boolean;
  close: () => void;
  children: ReactNode;
}

export function CreateReviewModal({ isOpened, close, children }: Props) {
  useEffect(() =>  {
    if (isOpened) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "visible";
    }
  }, [isOpened]);

  return (
    <div
      onClick={close}
      className={`${css.wrapper} ${isOpened ? css.opened : ''}`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={css.container}
      >
        <div className={css.heading}>
          <h2 className='h2'>Отзыв на товар</h2>
          <button onClick={close}>
            <Cross className={css.crossSVG} />
          </button>
        </div>

        <div>
          {children}
        </div>
      </div>
    </div>
  );
}
