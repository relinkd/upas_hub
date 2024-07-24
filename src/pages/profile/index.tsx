import { Typography, Stack } from '@mui/material';
import { Layout, UserBlock } from 'widgets';

export const ProfilePage = () => {
  return (
    <Layout>
      <Stack flexDirection="row" justifyContent="center" width={1} maxWidth={1}>
        <UserBlock />
      </Stack>
    </Layout>
  );
};
