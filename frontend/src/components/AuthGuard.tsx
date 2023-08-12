import { PropsWithChildren } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../stores/session.store.ts';

export function AuthGuard({ children }: PropsWithChildren) {
  const isAuth = useAuth();

  if (!isAuth) return <Navigate to={'/'} />;

  return <> {children} </>;
}
