import { NavPaths } from '../../navigation';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.jpg';
import css from './index.module.css';

export const Logo = () => (
  <Link to={NavPaths.MAIN} className={css.logo}>
    <img className={css.img} src={logo} alt='PROFF CLEAN MARKET' />
    <span className={css.text}>PROFF CLEAN MARKET</span>
  </Link>
);
