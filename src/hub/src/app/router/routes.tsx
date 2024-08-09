import { HubPage } from 'pages/hub';

import { RoutesProps } from './types';

export const appRoutes: RoutesProps = {
  home: {
    path: '/',
    component: <HubPage />,
  },
};
