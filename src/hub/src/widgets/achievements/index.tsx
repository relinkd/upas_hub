import { Box, Typography, Stack } from '@mui/material';
import { Achievements as AchievementsType, useShallowSelector } from 'shared';
import { userModel } from 'entities/user';
import { Achievement } from 'features/achievement';
import { useQueryCall, useAuth } from '@ic-reactor/react';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

export const Achievements = () => {

  const { identity } = useAuth();

  const dispatch = useDispatch();

  const { achievements: achievementsCurrent } = useShallowSelector(userModel.selectors.getUser)

  const { data: achievements, call: refetchAchievements } = useQueryCall({
    functionName: "getPrincipalAchievementsMetadata",
    args: [
      identity?.getPrincipal()
    ]
  })


  useEffect(() => {
    let typedAch = achievements as AchievementsType;

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

    if (JSON.stringify(result) !== JSON.stringify(achievementsCurrent)) {
      dispatch(
        userModel.userActions.updateUserState({
          achievements: result
        })
      )
    }
  }, [achievements])

 

  return (
    <Box paddingTop={12} sx={{
      width: '100%',
      display: 'flex',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      flexDirection: 'row'
    }}>
        {
          Object.keys(achievementsCurrent).map((key, id) => {
            const achievementsArray = achievementsCurrent[key].map(achievement => {
              return <Achievement address={key} achievement={achievement} id={id} />
            })
            return achievementsArray
          })
        }
        <Stack justifyContent='center' flexDirection='row' width={1}>
          {
            Object.keys(achievementsCurrent).length === 0 && <Typography>No achievements</Typography>
          }
        </Stack>
    </Box>
  );
};
