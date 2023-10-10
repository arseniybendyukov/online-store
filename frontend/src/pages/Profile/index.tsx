import { Outlet } from 'react-router-dom';
import css from './index.module.css';
import { NavTabs } from '../../components/NavTabs';
import { ProfileNestedPaths } from '../../navigation';
import { useLogoutMutation } from '../../redux/apis/authApi';
import { useAppSelector } from '../../redux/store';
import { PrivateRoute } from '../../components/PrivateRoute';

export function Profile() {
  const [logout] = useLogoutMutation();

  const logoutButtonOnClick = async () => {
    await logout();
  }

  return (
    <PrivateRoute>
      <div className={`container ${css.container}`}>
        <aside className={css.sidebar}>
          <UserInfo />

          <div className={css.tabs}>
            <NavTabs
              vertical
              options={[
                {
                  name: 'Заказы',
                  path: ProfileNestedPaths.ORDERS,
                },
                {
                  name: 'Корзина',
                  path: ProfileNestedPaths.CART,
                },
                {
                  name: 'Сохраненное',
                  path: ProfileNestedPaths.SAVED,
                },
                {
                  name: 'Отзывы на товары',
                  path: ProfileNestedPaths.REVIEWS,
                },
                {
                  name: 'Личные данные',
                  path: ProfileNestedPaths.PERSONAL_INFO,
                },
              ]}
            />

            <button onClick={logoutButtonOnClick} className={css.logoutButton}>
              Выйти из аккаунта
            </button>
          </div>
        </aside>
        <div className={css.content}>
          <Outlet />
        </div>
      </div>
    </PrivateRoute>
  );
}

function UserInfo() {
  const user = useAppSelector((state) => state.userState.user);

  return (
    <div className={css.userInfo}>
      <div className={css.avatar}>
        {user?.image && (
          <img src={user.image} alt='avatar' />
        )}
      </div>
      <h3 className={`h3 ${css.fullname}`}>
        {`${user?.first_name} ${user?.last_name}`}
      </h3>
    </div>
  );
}
