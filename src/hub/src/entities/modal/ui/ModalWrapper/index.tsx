import { PropsWithChildren } from 'react';
import { useDispatch } from 'react-redux';
import { IconButton, Stack, styled, Typography, useMediaQuery, useTheme } from '@mui/material';
import { modalModel } from 'entities/modal';
import { BORDER_RADIUS_M, BORDER_RADIUS_S, Icon } from 'shared';

interface ModalWrapperProps {
  title: string;
  size?: 'sm' | 'lg' | 'md';
  font?: string;
  fontWeight?: string;
}
const Wrapper = styled(Stack)(({ theme }) => ({
  background: theme.themeColors.background,
  width: '100%',
  height: '100%',
  alignItems: 'center',
  overflowY: 'auto',

  '&.lg': {
    [theme.breakpoints.up('md')]: {
      margin: theme.spacing(12, 1.25, 0),
      padding: theme.spacing(9, 0, 4),
      maxHeight: `calc(100vh - ${theme.spacing(12)})`,
      borderTopLeftRadius: BORDER_RADIUS_M,
      borderTopRightRadius: BORDER_RADIUS_M,
    },
  },

  '&.sm': {
    [theme.breakpoints.up('md')]: {
      maxWidth: '466px',
      height: 'fit-content',
      borderRadius: BORDER_RADIUS_M,
      margin: theme.spacing(0),
      padding: theme.spacing(2.5, 2.5, 4),
    },
  },
  '&.md': {
    [theme.breakpoints.up('md')]: {
      maxWidth: '700px',
      height: 'fit-content',
      borderRadius: BORDER_RADIUS_M,
      margin: theme.spacing(0),
      padding: theme.spacing(2.5, 2.5, 4),
    },
  },

  [theme.breakpoints.down('md')]: {
    margin: theme.spacing(7, 0.5, 0),
    padding: theme.spacing(2, 2, 3),
    maxHeight: `calc(100vh - ${theme.spacing(7)})`,
    borderTopLeftRadius: BORDER_RADIUS_S,
    borderTopRightRadius: BORDER_RADIUS_S,
  },
}));

export const ModalWrapper = ({
  title,
  size = 'lg',
  children,
  font = 'primary',
  fontWeight = 'bold',
}: ModalWrapperProps & PropsWithChildren) => {
  const theme = useTheme();
  const isDownMd = useMediaQuery(theme.breakpoints.down('md'));
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(modalModel.modalActions.closeModal());
  };

  return (
    <Wrapper className={size}>
      <Stack maxWidth={648} width="100%">
        <Stack
          direction="row"
          justifyContent={isDownMd ? 'center' : ' space-between'}
          alignItems="center"
          position="relative"
          width="100%"
          mb={{ xs: 6, md: 8 }}
        >
          <Typography variant="h1" fontWeight={fontWeight} className={`small ${font}`}>
            {title}
          </Typography>
          <IconButton
            size="large"
            color={isDownMd ? 'primary' : 'secondary'}
            onClick={handleClose}
            sx={{ position: isDownMd ? 'absolute' : 'unset', left: 0 }}
          >
            {isDownMd ? <Icon type="arrow" /> : <Icon type="close" />}
          </IconButton>
        </Stack>
        {children}
      </Stack>
    </Wrapper>
  );
};
