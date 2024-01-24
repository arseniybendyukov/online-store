import { ReactNode } from 'react';
import { useWhoAmIQuery } from '../../redux/api';
import { SpinnerScreen } from '../SpinnerScreen';

interface Props {
  children: ReactNode;
}

export function AuthMiddleware({ children }: Props) {
  const { isLoading } = useWhoAmIQuery();

  if (isLoading) {
    return <SpinnerScreen size={80} width='100vw' height='100vh' />;
  }

  return <>{children}</>;
}
