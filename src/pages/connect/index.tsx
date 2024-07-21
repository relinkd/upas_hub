import { useCallback } from 'react';
import { Box, Stack, styled, Typography } from '@mui/material';
import {
  BORDER,
  BORDER_RADIUS_S,
  BORDER_WIDTH_HOVER,
} from 'shared';
import { Layout, LayoutBackground } from 'widgets';
import { ConnectButton, ConnectDialog, Connect2ICProvider, useConnect } from "@connect2ic/react"


const WalletCard = styled(Box)(({ theme }) => ({
  width: 200,
  height: 148,
  background: theme.themeColors.colorBackground,
  border: BORDER,
  borderColor: theme.themeColors.colorBorder,
  borderRadius: BORDER_RADIUS_S,
  padding: theme.spacing(2),
  '&:hover': {
    borderColor: theme.themeColors.colorBorderHover,
    borderWidth: BORDER_WIDTH_HOVER,
    cursor: 'pointer',
  },
}));

const InnerWrapper = styled(Stack)(() => ({
  width: '100%',
  height: 116,
  justifyContent: 'space-between',
  alignItems: 'center',
}));

export const ConnectPage = () => {
  const { isConnected, principal, activeProvider } = useConnect({
    onConnect: () => {
      // Signed in
    },
    onDisconnect: () => {
      // Signed out
    }
  })

  return (
    <Layout bg={LayoutBackground.Sm}>
      <Typography variant="h1" className="center" mt={{ xs: 2, md: 15, lg: 36 }} mb={3.75}>
        Connect your wallet
      </Typography>
      <Stack direction={{ xs: 'column', md: 'row' }} spacing={1} justifyContent="space-between" alignItems="center">
        <ConnectButton />
        <ConnectDialog dark />
      </Stack>
      <Typography className="center" mt={7.5}>
        Sign in by selecting your preffered wallet
      </Typography>
    </Layout>
  );
};
