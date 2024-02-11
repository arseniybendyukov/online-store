import { Outlet } from 'react-router-dom';
import css from './index.module.css';
import { NavTabs } from '../../components/NavTabs';
import { profileLinks } from '../../navigation';
import { useLogoutMutation } from '../../redux/api';
import { useAppSelector } from '../../redux/store';
import { PrivateRoute } from '../../components/PrivateRoute';
import { UserInfo } from '../../components/UserInfo';

export function Profile() {
  const user = useAppSelector((state) => state.userState.user);
  const [logout] = useLogoutMutation();

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
              <NavTabs vertical options={profileLinks} />

              <button onClick={() => logout()} className={css.logoutButton}>
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
