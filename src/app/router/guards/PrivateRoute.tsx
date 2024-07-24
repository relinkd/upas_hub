import { Navigate } from 'react-router-dom';
import { userModel } from 'entities/user';
import { routes, useShallowSelector } from 'shared';
import { useConnect } from '@connect2ic/react';

type ProtectedRouteProps = {
  outlet: JSX.Element;
};

export const PrivateRoute = ({ outlet }: ProtectedRouteProps) => {
  const { principal, isConnected } = useConnect();
  if (!principal) {
    return <Navigate to={routes.connect.path} replace />;
  }

  return outlet;
};
