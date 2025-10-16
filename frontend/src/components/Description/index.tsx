import { useLayoutEffect, useRef, useState } from 'react';
import css from './index.module.css';

interface Props {
  text: string;
}

export function Description({ text }: Props) {
  const [isOpened, setIsOpened] = useState(false);
  const [height, setHeight] = useState(0)
  const ref = useRef<HTMLParagraphElement>(null)
  
  const MAX_HEIGHT = 120;

  useLayoutEffect(() => {
    setHeight(ref.current ? ref.current.clientHeight : 0)
  }, [])

  return (
    <div className={css.container}>
      <h4 className='h4'>Описание</h4>

      <p ref={ref} className={`${css.description} ${height >= MAX_HEIGHT && !isOpened ? css.truncate : ''}`}>
        {text}
      </p>

      {height >= MAX_HEIGHT && (
        <button
        className={css.button}
        onClick={() => setIsOpened((prevIsOpened) => !prevIsOpened)}
      >
        {
          isOpened
          ? 'Hide'
          : 'Read more...'
        }
      </button>
      )}
    </div>
  );
}
