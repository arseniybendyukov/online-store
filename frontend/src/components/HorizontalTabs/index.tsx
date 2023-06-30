import { NavLink } from 'react-router-dom';
import { NamedLink } from '../../types/common';
import css from './index.module.css';

interface Props {
  options: NamedLink[];
}

export function HorizontalTabs({ options }: Props) {
  return (
    <div className={css.tabs}>
      {options.map((option) => (
        <NavLink
          key={option.path}
          className={css.tabLink}
          to={option.path}
        >
          {({ isActive }: { isActive: boolean }) => (
            <div className={`${css.tab} ${isActive ? css.active : ''}`}>
              {option.name}
            </div>
          )}
        </NavLink>
      ))}
    </div>
  );
}
