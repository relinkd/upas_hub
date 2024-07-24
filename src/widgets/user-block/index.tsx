import { Stack, Typography, Box } from '@mui/material';
import { GradientButtonWraper, COLOR_BACKGROUND_PURPLE, BORDER_RADIUS_S, COLOR_BLACK, BORDER, COLOR_LIGHT_GRAY } from 'shared';

export const UserBlock = () => {

  return (
    <Stack flexDirection="row" alignItems="center" sx={{
        backgroundColor: COLOR_BACKGROUND_PURPLE,
        borderRadius: BORDER_RADIUS_S,
        padding: 3,
        width: "900px",
        border: BORDER,
        borderColor: COLOR_LIGHT_GRAY
    }}>
      <Stack justifyContent="left">
        <GradientButtonWraper>
            <Box width={140} height={140} sx={{
                borderRadius: BORDER_RADIUS_S,
                backgroundColor: 'white'
            }}/>
        </GradientButtonWraper>
      </Stack>
      <Stack paddingLeft={7}>
        <Typography fontSize="24px" color={COLOR_BLACK} className="left" paddingBottom={2}>
            User Achievements
        </Typography>
        <Typography className="left">
            This is description of user public achievements. This is description of user public achievements. Test tree some trees. 
            This is description of user public achievements. This is description of user public achievements. 
        </Typography>
      </Stack>
    </Stack>
  );
};
