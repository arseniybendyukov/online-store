import { Link } from 'react-router-dom';
import { headerLinks } from '../../../navigation';
import css from './index.module.css';
import { useState } from 'react';

export function Burger() {
  const [isOpened, setIsOpened] = useState(false);

  return (
    <div className={`${css.burger} ${isOpened ? css.opened : ''}`}>
      <button
        className={css.button}
        onClick={() => setIsOpened((prev) => !prev)}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <div className={css.buttonPlaceholder} />

      <nav>
        <ul className={css.burgerLinks}>
          {
            [
              {
                path: '/',
                name: 'Главная',
              },
              ...headerLinks,
            ].map((link) => (
              <li key={link.path} onClick={() => setIsOpened(false)}>
                <Link to={link.path}>
                  {link.name}
                </Link>
              </li>
            ))
          }
        </ul>
      </nav>
    </div>
  );
};
