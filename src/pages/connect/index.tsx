import { useDispatch } from 'react-redux';
import { Stack, Typography, styled } from '@mui/material';
import { userModel } from 'entities/user';
import { Layout, LayoutBackground } from 'widgets';
import { ConnectButton, ConnectDialog, Connect2ICProvider, useConnect } from "@connect2ic/react"
import { BORDER_RADIUS_S } from 'shared';


const GradientButtonWraper = styled(Stack)(({ theme }) => ({
  background: "linear-gradient(128.74deg, #8A2BDD 5.87%, #57DCFE 102.86%)",
  position: "relative",
  borderRadius: BORDER_RADIUS_S,
  padding: "2px",
  '&:hover': {
    background: "gray"
  }
}))


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
      <Stack direction={{ xs: 'column', md: 'row' }} spacing={1} justifyContent="center" alignItems="center">
        <GradientButtonWraper>
          <ConnectButton />
        </GradientButtonWraper>
        <ConnectDialog dark={false} />
      </Stack>
      <Typography className="center" mt={7.5}>
        Sign in by selecting your preffered wallet
      </Typography>
    </Layout>
  );
};
