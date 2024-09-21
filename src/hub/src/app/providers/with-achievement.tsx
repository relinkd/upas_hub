import { FC, PropsWithChildren, memo } from 'react';
import { useShallowSelector } from 'shared';
import { userModel } from 'entities/user';
import { ReputationProvider, AchievementProvider } from 'upas-reputation';

export const WithAchievementProvider: FC<PropsWithChildren> = memo(({ children }) => {

  const postMessage = useShallowSelector(userModel.selectors.getPostMessage);
  console.log('postMessage rerender')

  console.log(postMessage?.achievement, postMessage?.reputation_module, 'messagepost')

  return(
    <ReputationProvider canisterId={postMessage?.reputation_module || '2vxsx-fae'}>
        <AchievementProvider canisterId={postMessage?.achievement || '2vxsx-fae'}>
          {children}
        </AchievementProvider>
    </ReputationProvider>
  )
});
