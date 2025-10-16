import { NavPaths } from '../../navigation';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.svg';
import css from './index.module.css';

export const Logo = () => (
  <Link to={NavPaths.MAIN} className={css.logo}>
    <img className={css.img} src={logo} alt='ProClean SOLUTIONS' />
    <span className={css.text}>ProClean <br/> SOLUTIONS</span>
  </Link>
);
