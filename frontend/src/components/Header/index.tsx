import { AuthNestedPaths, NavPaths, paramPath } from '../../navigation';
import { Logo } from '../Logo';
import { NavLinks } from './NavLinks';
import { Button } from '../Button';
import { IconButton } from './IconButton';
import { ReactComponent as Heart } from '../../images/heart.svg';
import { ReactComponent as ShoppingCart } from '../../images/shopping-cart.svg';
import css from './index.module.css';

export const Header = () => (
  <header className={css.header}>
    <div className='container'>
      <Logo />
      <NavLinks />
      <div className={css.buttons}>
        <Button
          path={paramPath(NavPaths.AUTH, AuthNestedPaths.LOGIN)}
          state={{
            default: { text: 'Войти', icon: undefined }
          }}
        />
        <IconButton
          icon={<Heart />}
          path={NavPaths.MAIN}
          counter={2}
        />
        <IconButton
          icon={<ShoppingCart />}
          path={NavPaths.MAIN}
          counter={19}
        />
      </div>
    </div>
  </header>
);
