import { ReactNode, useEffect } from 'react';
import { AuthNestedPaths, NavPaths } from '../../navigation';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../redux/store';

interface Props {
  children: ReactNode;
}

export function PrivateRoute({ children }: Props) {
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.userState.user);

  // TODO: !не работает: пользователя всегда выкидывает на /login!

  useEffect(() => {
    if (!user) {
      navigate(`${NavPaths.AUTH}/${AuthNestedPaths.LOGIN}`);
    }
  }, [user]);

  return <>{children}</>;
}
