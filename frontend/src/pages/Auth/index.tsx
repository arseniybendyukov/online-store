import { Outlet } from 'react-router-dom';
import css from './index.module.css';

export function Auth() {
  return (
    <div className={css.wrapper}>
      <div className={css.polygon}></div>
      <div className={`container ${css.container}`}>
        <Outlet />
      </div>
    </div>
  );
}
