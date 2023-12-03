import { AuthNestedPaths, NavPaths, ProfileNestedPaths } from '../../navigation';
import { Logo } from '../Logo';
import { NavLinks } from './NavLinks';
import { Button } from '../Button';
import { IconButton } from './IconButton';
import { ReactComponent as Heart } from '../../images/heart.svg';
import { ReactComponent as ShoppingCart } from '../../images/shopping-cart.svg';
import css from './index.module.css';
import { useGetMyCountsQuery } from '../../redux/apis/productsApi';
import { Spinner } from '../Spinner';
import { useAppSelector } from '../../redux/store';

export function Header() {
  const user = useAppSelector((state) => state.userState.user);
  const localCart = useAppSelector((state) => state.localCartState.items);
  const { data, isLoading } = useGetMyCountsQuery();

  let cartCount: number;
  if (isLoading) {
    cartCount = 0;
  } else {
    if (user) {
      if (data) {
        cartCount = data.cart_products_count;
      } else {
        cartCount = 0;
      }
    } else {
      cartCount = localCart.length;
    }
  }

  return (
    <header className={css.header}>
      <div className='container'>
        <Logo />
        <NavLinks />
        <div className={css.buttons}>
          {!user && (
            <Button
              path={`${NavPaths.AUTH}/${AuthNestedPaths.LOGIN}`}
              state={{
                default: { text: 'Войти', icon: undefined }
              }}
            />
          )}

          <IconButton
            icon={<ShoppingCart />}
            path={`${NavPaths.CART}`}
            counter={cartCount}
          />

          {
            isLoading
            ? <Spinner size={30} thickness={3} />
            : data && <>
              {/* todo: в header вместо сохраненных показывать профиль */}
              <IconButton
                icon={<Heart />}
                path={`${NavPaths.PROFILE}/${ProfileNestedPaths.SAVED}`}
                counter={data.saved_product_variants_count}
              />
            </>
          }
        </div>
      </div>
    </header>
  );
}
