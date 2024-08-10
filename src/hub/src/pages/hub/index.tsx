import { Typography, Stack, Button } from '@mui/material';
import { Layout, UserBlock } from 'widgets';
import { useQueryCall, useAuth, useAgent } from '@ic-reactor/react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { IssuerTuple } from 'shared';
import { useAchievementMethod } from 'app/providers';
import { userModel } from 'entities/user';

export const HubPage = () => {

  const dispatch = useDispatch();

  const {login, authenticated, identity} = useAuth();

  const { data: achievements, call: refetchAchievements } = useQueryCall({
    functionName: "getPrincipalAchievementsMetadata",
    args: [
      identity?.getPrincipal()
    ]
  })

  useEffect(() => {
    dispatch(
      userModel.userActions.updateUserState({
        achievements: achievements
      })
    )
  }, [achievements])

  console.log(achievements, 'nfts')
  console.log(identity?.getPrincipal().toText())

  // const { data: caller, call: reCall } = useQueryCall({
  //   functionName: "caller",
  // })

  // const { data: callerA, call: reCallA } = useAchievementMethod({
  //   functionName: "caller",
  // })

  return (
    <Layout>
      <Stack flexDirection="column" alignItems="center" width={1} maxWidth={1}>
        <UserBlock />
      </Stack>
    </Layout>
  );
};
