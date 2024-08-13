import { Typography, Stack, Button } from '@mui/material';
import { Layout, UserBlock, Achievements as AchievementsWidget } from 'widgets';
import { useQueryCall, useAuth, useAgent } from '@ic-reactor/react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Achievements, useShallowSelector } from 'shared';
import { userModel } from 'entities/user';


export const HubPage = () => {

  const dispatch = useDispatch();

  const {login, authenticated, identity} = useAuth();

  const { postMessage } = useShallowSelector(userModel.selectors.getUser)

  const { data: achievements, call: refetchAchievements } = useQueryCall({
    functionName: "getPrincipalAchievementsMetadata",
    args: [
      identity?.getPrincipal()
    ]
  })

  useEffect(() => {
    let typedAch = achievements as Achievements;

    const result: Record<string, Record<string, string>[]> = {};

    if(!achievements) return;

    typedAch?.Ok.forEach(([principal, achievementArray]) => {
      const principalKey = principal?.toText() as string;
      

      result[principalKey] = [];
  
      achievementArray.forEach((fields) => {
        const innerObject: Record<string, string> = {};
        fields.forEach((field) => {
          const typedField = field as unknown as [string, {Text: string}];
          innerObject[typedField[0]] = typedField[1].Text;
        })
        result[principalKey].push(innerObject); 
      });
    });

    dispatch(
      userModel.userActions.updateUserState({
        achievements: result
      })
    )
  }, [achievements])

  useEffect(() => {
    if(postMessage?.type === "SELECT_IDENTITY") {
      window.opener.postMessage({
        type: 'RETURN_IDENTITY',
        payload: identity?.getPrincipal()?.toText()
      }, "http://localhost:5174")
    }
  }, [postMessage])
  
  return (
    <Layout>
      <Stack flexDirection="column" alignItems="center" width={1} maxWidth={1}>
        <UserBlock />
        <AchievementsWidget />
      </Stack>
    </Layout>
  );
};
