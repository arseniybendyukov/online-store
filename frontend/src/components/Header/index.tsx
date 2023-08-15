import { AuthNestedPaths, NavPaths, ProfileNestedPaths } from '../../navigation';
import { Logo } from '../Logo';
import { NavLinks } from './NavLinks';
import { Button } from '../Button';
import { IconButton } from './IconButton';
import { ReactComponent as Heart } from '../../images/heart.svg';
import { ReactComponent as ShoppingCart } from '../../images/shopping-cart.svg';
import css from './index.module.css';
import { useGetMyCountsQuery } from '../../redux/apis/productsApi';

export function Header() {
  const { data } = useGetMyCountsQuery();

  return (
    <header className={css.header}>
      <div className='container'>
        <Logo />
        <NavLinks />
        <div className={css.buttons}>
          <Button
            path={`${NavPaths.AUTH}/${AuthNestedPaths.LOGIN}`}
            state={{
              default: { text: 'Войти', icon: undefined }
            }}
          />
          {data && <>
            <IconButton
              icon={<Heart />}
              path={`${NavPaths.PROFILE}/${ProfileNestedPaths.SAVED}`}
              counter={data.saved_products_count}
            />
            <IconButton
              icon={<ShoppingCart />}
              path={`${NavPaths.PROFILE}/${ProfileNestedPaths.CART}`}
              counter={data.cart_products_count}
            />
          </>}
        </div>
      </div>
    </header>
  );
}
