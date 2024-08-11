import { Stack, styled, Typography } from '@mui/material';
import { IssuerTuple, GradientButtonWraper, BORDER_RADIUS_S, COLOR_BLACK, COLOR_LIGHT_BLUE } from 'shared';
import icon from './assets/icon.png';
import { useDispatch } from 'react-redux';
import { modalModel } from 'entities/modal';
import { Modals } from 'entities/modal/model';

const StyledImg = styled('img')({
  display: 'block',
  width: '40px',
  height: '40px'
});

export const Achievement = ({ address, achievement, id }: { address: string, achievement: Record<string, string>, id: number }) => {
  const dispatch = useDispatch();

  return (
    <GradientButtonWraper width="49%" marginY={1.5} sx={{
      borderRadius: BORDER_RADIUS_S,
      '&:hover': {
        boxShadow: '0px 0px 58.1px -15px #635D952E'
      }
    }} 
    onClick={() => {
      dispatch(
        modalModel.modalActions.openModal({
          type: Modals.AchievementModal,
          data: {
            id,
            collection: address
          },
        }),
      );
    }}
    >
      <Stack flexDirection="row" alignItems="center" justifyContent="space-between" width={1} paddingX={2} height="70px" sx={{
        backgroundColor: 'white',
        borderRadius: BORDER_RADIUS_S
      }}>
          <Stack flexDirection="row" alignItems="center">
            <StyledImg src={icon} />
            <Typography color={COLOR_BLACK} paddingLeft={6}>{achievement?.Name}</Typography>
          </Stack>
          {/* {issuer[1].verified ? <Typography color={COLOR_LIGHT_BLUE}>verified</Typography> : <Typography>unverified</Typography>} */}
      </Stack>
    </GradientButtonWraper>
  );
};
