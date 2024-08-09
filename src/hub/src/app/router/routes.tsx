import { HubPage } from 'pages/hub';
import { ConnectPage } from 'pages/connect';

import { RoutesProps } from './types';

export const appRoutes: RoutesProps = {
  home: {
    path: '/',
    component: <HubPage />,
    isProtected: true,
  },
  connect: {
    path: '/connect',
    component: <ConnectPage />
  }
};
