import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Stack, Typography, Button } from '@mui/material';
import { Layout, LayoutBackground } from 'widgets';
import { routes, GradientButtonWraper } from 'shared';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@ic-reactor/react';

export const ConnectPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { login, authenticated } = useAuth();

  useEffect(() => {
    if (authenticated) {
      navigate(routes.hub.path);
    }
  }, [authenticated, navigate]);

  return (
    <Layout bg={LayoutBackground.Sm}>
      <Typography variant="h1" className="center" mt={{ xs: 2, md: 15, lg: 36 }} mb={3.75}>
        Connect your wallet
      </Typography>
      <Stack direction={{ xs: 'column', md: 'row' }} spacing={1} justifyContent="center" alignItems="center">
        <GradientButtonWraper>
          <Button onClick={() => {
            login({
              identityProvider: 'http://c2lt4-zmaaa-aaaaa-qaaiq-cai.localhost:4943/#authorize'
            })
          }}>Connect</Button>
        </GradientButtonWraper>
      </Stack>
      <Typography className="center" mt={7.5}>
        Sign in by selecting your preffered wallet
      </Typography>
    </Layout>
  );
};
