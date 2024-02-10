import { AuthNestedPaths, NavPaths, ProfileNestedPaths, profileLinks } from '../../navigation';
import { Logo } from '../Logo';
import { NavLinks } from './NavLinks';
import { Button } from '../Button';
import { IconButton } from './IconButton';
import { ReactComponent as User } from '../../images/user.svg';
import { ReactComponent as ShoppingCart } from '../../images/shopping-cart.svg';
import css from './index.module.css';
import { useAppSelector } from '../../redux/store';
import { Link } from 'react-router-dom';
import { Burger } from './Burger';
import { useState } from 'react';
import { ReactComponent as Cross } from '../../images/cross.svg';
import { UserInfo } from '../UserInfo';

export function Header() {
  const user = useAppSelector((state) => state.userState.user);
  const localCart = useAppSelector((state) => state.localCartState.items);

  const [isProifleModalOpened, setIsProifleModalOpened] = useState(false);

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
            ? <>
              <Link className={css.linkOnProfile} to={`${NavPaths.PROFILE}/${ProfileNestedPaths.PERSONAL_INFO}`}>
                <User className={css.userSVG} />
              </Link>

              <div className={`${css.profileModalContainer} ${isProifleModalOpened ? css.opened : ''}`}>
                <button className={css.profileButton} onClick={() => setIsProifleModalOpened(true)}>
                  <User className={css.userSVG} />
                </button>

                <div className={css.profileModal}>
                  <button className={css.closeProfileModalButton} onClick={() => setIsProifleModalOpened(false)}>
                    <Cross className={css.crossSVG} />
                  </button>

                  <div className={css.modalMain}>
                    <UserInfo
                      firstName={user.first_name}
                      lastName={user.last_name}
                      color={user.color}
                      image={user.image}
                    />

                    <ul className={css.profileLinks}>
                      {profileLinks.map((link) => (
                        <li key={link.path} onClick={() => setIsProifleModalOpened(false)}>
                          <Link to={`${NavPaths.PROFILE}/${link.path}`}>
                            {link.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </> : (
              <Button
                path={`${NavPaths.AUTH}/${AuthNestedPaths.LOGIN}`}
                state={{
                  default: { text: 'Войти', icon: undefined }
                }}
              />
            )
          }

          <Burger />
        </div>
      </div>
    </header>
  );
}
