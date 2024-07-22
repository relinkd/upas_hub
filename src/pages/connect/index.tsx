import { useDispatch } from 'react-redux';
import { Stack, Typography } from '@mui/material';
import { userModel } from 'entities/user';
import { Layout, LayoutBackground } from 'widgets';
import { ConnectButton, ConnectDialog, Connect2ICProvider, useConnect } from "@connect2ic/react"


export const ConnectPage = () => {
  const dispatch = useDispatch();
  const { isConnected, principal, activeProvider } = useConnect({
    onConnect: () => {
      dispatch(
        userModel.userActions.updateUserState({
          isConnected,
        })
      )
    },
    onDisconnect: () => {
      dispatch(
        userModel.userActions.updateUserState({
          isConnected: false,
        })
      )
    }
  })

  return (
    <Layout bg={LayoutBackground.Sm}>
      <Typography variant="h1" className="center" mt={{ xs: 2, md: 15, lg: 36 }} mb={3.75}>
        Connect your wallet
      </Typography>
      <Stack direction={{ xs: 'column', md: 'row' }} spacing={1} justifyContent="space-between" alignItems="center">
        <ConnectButton />
        <ConnectDialog dark={false} />
      </Stack>
      <Typography className="center" mt={7.5}>
        Sign in by selecting your preffered wallet
      </Typography>
    </Layout>
  );
};
