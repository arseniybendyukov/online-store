import { ReactNode } from 'react';
import { useWhoAmIQuery } from '../../redux/apis/authApi';
import css from './index.module.css';

interface Props {
  children: ReactNode;
}

export function AuthMiddleware({ children }: Props) {
  const { isLoading, isFetching } = useWhoAmIQuery();

  const loading = isLoading || isFetching;

  if (loading) {
    return <div>ЗАГРУЗКА</div>;
  }

  return <>{children}</>;
}
