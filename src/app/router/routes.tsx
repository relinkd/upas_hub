import { ConnectPage } from 'pages/connect';
import { ProfilePage } from 'pages/profile';

import { RoutesProps } from './types';

export const appRoutes: RoutesProps = {
  connect: {
    path: '/connect',
    component: <ConnectPage />,
  },
  home: {
    path: '/profile',
    component: <ProfilePage />,
    isProtected: true,
  },
};
