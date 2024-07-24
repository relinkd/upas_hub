import { BORDER_RADIUS_S, COLOR_PURPLE_GRADIENT, COLOR_LIGHT_GRAY, BORDER_PADDING } from 'shared';
import { styled, Stack } from '@mui/material';

export const GradientButtonWraper = styled(Stack)(({ theme }) => ({
    background: COLOR_PURPLE_GRADIENT,
    position: "relative",
    borderRadius: BORDER_RADIUS_S,
    padding: BORDER_PADDING,
    '&:hover': {
      background: COLOR_LIGHT_GRAY
    }
}))
