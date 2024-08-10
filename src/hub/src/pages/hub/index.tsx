import { Typography, Stack, Button } from '@mui/material';
import { Layout, UserBlock } from 'widgets';
import { useQueryCall, useAuth, useAgent } from '@ic-reactor/react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Achievements } from 'shared';
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
    let typedAch = achievements as Achievements;

    const result: Record<string, Record<string, string>> = {};

    if(!achievements) return;

    typedAch?.Ok.forEach(([principal, achievementArray]) => {
      const principalKey = principal?.toText() as string;
      const innerObject: Record<string, string> = {};
  
      achievementArray.forEach((fields) => {
        fields.forEach((field) => {
          const typedField = field as unknown as [string, {Text: string}];
          innerObject[typedField[0]] = typedField[1].Text;
        })
      });
  
      result[principalKey] = innerObject; 
    });

    console.log(result, 'result')

    dispatch(
      userModel.userActions.updateUserState({
        achievements: result
      })
    )
  }, [achievements])

  console.log(achievements, 'nfts')
  console.log(identity?.getPrincipal().toText())
  
  return (
    <Layout>
      <Stack flexDirection="column" alignItems="center" width={1} maxWidth={1}>
        <UserBlock />
      </Stack>
    </Layout>
  );
};
