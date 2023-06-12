import { Link } from 'react-router-dom';
import { NavPaths } from '../../navigation';
import css from './index.module.css';
import logo from '../../images/logo.jpg';

export function Logo() {
  return (
    <Link to={NavPaths.MAIN} className={css.logo}>
      <img className={css.img} src={logo} alt="PROFF CLEAN MARKET" />
      <span className={css.text}>PROFF CLEAN MARKET</span>
    </Link>
  );
}