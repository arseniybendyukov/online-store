import { ReactNode, useEffect } from 'react';
import { useAmIAuthenticatedQuery } from '../../redux/api';
import { AuthNestedPaths, NavPaths } from '../../navigation';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../redux/store';

interface Props {
  children: ReactNode;
}

export function PrivateRoute({ children }: Props) {
  const navigate = useNavigate();
  const { data: isAuthenticated } = useAmIAuthenticatedQuery();
  const user = useAppSelector((state) => state.userState.user);

  useEffect(() => {
    if (isAuthenticated === false) {
      navigate(`${NavPaths.AUTH}/${AuthNestedPaths.LOGIN}`);
    }
  }, [isAuthenticated, user, navigate]);

  return <>{children}</>;
}
