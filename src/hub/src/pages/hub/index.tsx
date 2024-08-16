import { Stack } from '@mui/material';
import { Layout, UserBlock, Achievements as AchievementsWidget } from 'widgets';
import { WithAchievementProvider } from 'app/providers';
import { withProviders } from 'app/providers';

const AchievementsWrappedWidget = withProviders(WithAchievementProvider)(AchievementsWidget);


export const HubPage = () => {
  return (
    <Layout>
      <Stack flexDirection="column" alignItems="center" width={1} maxWidth={1}>
        <UserBlock />
        <AchievementsWrappedWidget />
      </Stack>
    </Layout>
  );
};
