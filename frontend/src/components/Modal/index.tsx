import { ReactNode } from 'react';
import css from './index.module.css';
import { ReactComponent as Cross } from '../../images/cross.svg';

interface Props {
  heading: string;
  width: number;
  isOpened: boolean;
  close: () => void;
  children: ReactNode;
}

export function Modal({ heading, width, isOpened, close, children }: Props) {
  return (
    <div
      onClick={(e) => {e.preventDefault(); close()}}
      className={`${css.wrapper} ${isOpened ? css.opened : ''}`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={css.container}
        style={{ width }}
      >
        <div className={css.content}>
          <div className={css.heading}>
            <h2 className='h2'>{heading}</h2>
            <button onClick={close}>
              <Cross className={css.crossSVG} />
            </button>
          </div>

          {children}
        </div>
      </div>
    </div>
  );
}
