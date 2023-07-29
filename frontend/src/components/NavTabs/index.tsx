import { NavLink } from 'react-router-dom';
import { NamedLink } from '../../types/common';
import css from './index.module.css';

interface Props {
  options: NamedLink[];
  vertical?: boolean;
}

export function NavTabs({ options, vertical=false }: Props) {
  return (
    <div className={`${css.tabs} ${vertical ? css.vertical : ''}`}>
      {options.map((option) => (
        <NavLink
          key={option.path}
          className={css.tabLink}
          to={option.path}
        >
          {({ isActive }: { isActive: boolean }) => (
            <div className={`${vertical ? css.verticalTab : css.horizontalTab} ${isActive ? css.active : ''}`}>
              {option.name}
            </div>
          )}
        </NavLink>
      ))}
    </div>
  );
}
