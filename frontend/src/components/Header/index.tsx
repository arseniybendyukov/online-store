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
  const { data, isLoading } = useGetMyCountsQuery();

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
          {
            isLoading
            ? <Spinner size={30} thickness={3} />
            : data && <>
              <IconButton
                icon={<Heart />}
                path={`${NavPaths.PROFILE}/${ProfileNestedPaths.SAVED}`}
                counter={data.saved_product_variants_count}
              />
              <IconButton
                icon={<ShoppingCart />}
                path={`${NavPaths.PROFILE}/${ProfileNestedPaths.CART}`}
                counter={data.cart_products_count}
              />
            </>
          }
        </div>
      </div>
    </header>
  );
}
