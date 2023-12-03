import { Outlet } from 'react-router-dom';
import css from './index.module.css';
import { NavTabs } from '../../components/NavTabs';
import { ProfileNestedPaths } from '../../navigation';
import { useLogoutMutation } from '../../redux/apis/authApi';
import { useAppSelector } from '../../redux/store';
import { PrivateRoute } from '../../components/PrivateRoute';
import { CircleAvatar } from '../../components/CircleAvatar';

export function Profile() {
  const user = useAppSelector((state) => state.userState.user);
  const [logout] = useLogoutMutation();

  const logoutButtonOnClick = async () => {
    await logout();
  }

  return (
    <PrivateRoute>
      {user && (
        <div className={`container ${css.container}`}>
          <aside className={css.sidebar}>
            <UserInfo
              firstName={user.first_name}
              lastName={user.last_name}
              color={user.color}
              image={user.image}
            />

            <div className={css.tabs}>
              <NavTabs
                vertical
                options={[
                  {
                    name: 'Заказы',
                    path: ProfileNestedPaths.ORDERS,
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
      )}
    </PrivateRoute>
  );
}

function UserInfo({ firstName, lastName, color, image }: {
  firstName: string;
  lastName: string;
  color: string;
  image: string | null;
}) {
  return (
    <div className={css.userInfo}>
      <CircleAvatar
        sizeType='medium'
        image={image}
        initials={firstName[0] + lastName[0]}
        color={color}
      />

      <h3 className={`h3 ${css.fullname}`}>
        {`${firstName} ${lastName}`}
      </h3>
    </div>
  );
}
