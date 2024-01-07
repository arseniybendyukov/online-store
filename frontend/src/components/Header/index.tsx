import { AuthNestedPaths, NavPaths, ProfileNestedPaths } from '../../navigation';
import { Logo } from '../Logo';
import { NavLinks } from './NavLinks';
import { Button } from '../Button';
import { IconButton } from './IconButton';
import { ReactComponent as User } from '../../images/user.svg';
import { ReactComponent as ShoppingCart } from '../../images/shopping-cart.svg';
import css from './index.module.css';
import { useAppSelector } from '../../redux/store';
import { Link } from 'react-router-dom';

export function Header() {
  const user = useAppSelector((state) => state.userState.user);
  const localCart = useAppSelector((state) => state.localCartState.items);

  let cartCount: number;
  if (user) {
    cartCount = user.cart_products_count;
  } else {
    cartCount = localCart.length;
  }

  return (
    <header className={css.header}>
      <div className='container'>
        <Logo />
        <NavLinks />
        <div className={css.buttons}>
          <IconButton
            icon={<ShoppingCart />}
            path={`${NavPaths.CART}`}
            counter={cartCount}
          />

          {
            user
            ? (
              <Link to={NavPaths.PROFILE}>
                <User className={css.userSVG} />
              </Link>
            ) : (
              <Button
                path={`${NavPaths.AUTH}/${AuthNestedPaths.LOGIN}`}
                state={{
                  default: { text: 'Войти', icon: undefined }
                }}
              />
            )
          }
        </div>
      </div>
    </header>
  );
}
