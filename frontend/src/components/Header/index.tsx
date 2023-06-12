import css from './index.module.css';
import { Logo } from '../Logo';
import { NavLinks } from './NavLinks';
import { Button } from '../Button';
import { NavPaths } from '../../navigation';
import { Link } from 'react-router-dom';
import { ReactComponent as Heart } from '../../images/heart.svg';
import { ReactComponent as ShoppingCart } from '../../images/shopping-cart.svg';

export function Header() {
  return (
    <header className={css.header}>
      <div className='container'>
        <Logo />
        <NavLinks />
        <div className={css.buttons}>
          <Button path={NavPaths.LOGIN}>Войти</Button>

          <Link className={css.iconButton} to='/'>
            <span className={css.counter}>2</span>
            <Heart width={40} height={40} />
          </Link>

          <Link className={css.iconButton} to='/'>
            <span className={css.counter}>19</span>
            <ShoppingCart width={40} height={40} />
          </Link>
        </div>
      </div>
    </header>
  );
}
