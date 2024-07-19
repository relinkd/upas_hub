import { Navigate } from 'react-router-dom';
import { userModel } from 'entities/user';
import { routes, useShallowSelector } from 'shared';

type ProtectedRouteProps = {
  outlet: JSX.Element;
};

export const PrivateRoute = ({ outlet }: ProtectedRouteProps) => {
  const { address } = useShallowSelector(userModel.selectors.selectUserWeb3Info);
  if (!address) {
    return <Navigate to={routes.connect.path} replace />;
  }

  return outlet;
};
