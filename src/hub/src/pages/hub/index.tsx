import { Typography, Stack, Button } from '@mui/material';
import { Layout, UserBlock } from 'widgets';
import { useQueryCall, useAuth, useAgent } from '@ic-reactor/react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { IssuerTuple } from 'shared';
import { useAchievementMethod } from 'app/providers';

export const HubPage = () => {

  const dispatch = useDispatch();

  const {login, authenticated, identity} = useAuth();

  const { data: issuers, call: refetchIssuers } = useQueryCall({
    functionName: "getIssuersBatch",
    args: [
      [],
      BigInt(10)
    ]
  })

  const { data: caller, call: reCall } = useQueryCall({
    functionName: "caller",
  })

  const { data: callerA, call: reCallA } = useAchievementMethod({
    functionName: "caller",
  })
  
  return (
    <Layout>
      <Stack flexDirection="column" alignItems="center" width={1} maxWidth={1}>
        <UserBlock />
      </Stack>
    </Layout>
  );
};
