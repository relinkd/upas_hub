import { FC, PropsWithChildren } from 'react';
import { createClient } from '@connect2ic/core';
import { defaultProviders } from '@connect2ic/core/providers';
import { Connect2ICProvider } from '@connect2ic/react';

import '@connect2ic/core/style.css';

const client = createClient({
  providers: defaultProviders as any,
});

export const WithICConnect: FC<PropsWithChildren> = ({ children }) => {
  return <Connect2ICProvider client={client}>{children}</Connect2ICProvider>;
};
