import { Box, Typography, Stack } from '@mui/material';
import { useShallowSelector } from 'shared';
import { userModel } from 'entities/user';
import { Achievement } from 'features/achievement';

export const Achievements = () => {

  const { achievements } = useShallowSelector(userModel.selectors.getUser);

  console.log(achievements);

  return (
    <Box paddingTop={12} sx={{
      width: '100%',
      display: 'flex',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      flexDirection: 'row'
    }}>
        {
          Object.keys(achievements).map((key, id) => {
            const achievementsArray = achievements[key].map(achievement => {
              return <Achievement address={key} achievement={achievement} id={id} />
            })
            return achievementsArray
          })
        }
        <Stack justifyContent='center' flexDirection='row' width={1}>
          {
            Object.keys(achievements).length === 0 && <Typography>No achievements</Typography>
          }
        </Stack>
    </Box>
  );
};
