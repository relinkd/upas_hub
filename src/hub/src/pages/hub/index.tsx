import { Typography, Stack, Button } from '@mui/material';
import { Layout, Search } from 'widgets';
import { useQueryCall, useAuth, useAgent } from '@ic-reactor/react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { marketplaceModel } from 'entities/marketplace';
import { IssuerTuple } from 'shared';
import { Issuers } from 'widgets/issuers';
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

  useEffect(() => {
    if(!issuers) return;

    dispatch(
      marketplaceModel.marketplaceActions.updateMarketplaceState({
        issuers: issuers as IssuerTuple[]
      })
    )
  }, [issuers])

  return (
    <Layout>
      <Stack flexDirection="column" alignItems="center" width={1} maxWidth={1}>
        <Button onClick={() => {
          login({
            identityProvider: 'http://c2lt4-zmaaa-aaaaa-qaaiq-cai.localhost:4943/#authorize'
          })
        }}>Login</Button>
        <Button onClick={() => {
          reCall();
          reCallA();
          console.log(caller, 'indexer');
          console.log(callerA, 'achivement');
          console.log(identity?.getPrincipal(), authenticated);
        }}>Call</Button>
        
        <Search />
        <Issuers />
      </Stack>
    </Layout>
  );
};
