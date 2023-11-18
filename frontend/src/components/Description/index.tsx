import { useState } from 'react';
import css from './index.module.css';

interface Props {
  text: string;
}

export function Description({ text }: Props) {
  const [isOpened, setIsOpened] = useState(false);

  return (
    <div className={css.container}>
      <p className={`${css.description} ${!isOpened ? css.truncate : ''}`}>
        {text}
      </p>
      <button
        className={css.button}
        onClick={() => setIsOpened((prevIsOpened) => !prevIsOpened)}
      >
        {
          isOpened
          ? 'Свернуть'
          : 'Подробнее...'
        }
      </button>
    </div>
  );
}
