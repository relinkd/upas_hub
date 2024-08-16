import { FC, PropsWithChildren, memo } from 'react';
import { canisterId as achievementCanisterId, idlFactory } from '../../../../declarations/achievement';
import { canisterId as reputationCanisterId, idlFactory as moduleIdlFactory } from '../../../../declarations/reputation_module';
import { createActorContext } from "@ic-reactor/react";
import { useParams } from "react-router-dom";
import { useShallowSelector } from 'shared';
import { userModel } from 'entities/user';
import { useSelector } from 'react-redux';

export const {
  ActorProvider: AchievementProvider,
  useActorState: useAchievementState,
  useMethod: useAchievementMethod,
  useQueryCall: useAchievementQueryCall,
  useUpdateCall: useAchievementUpdateCall,
} = createActorContext<any>({
  idlFactory,
  withDevtools: true,
})

export const {
  ActorProvider: ReputationProvider,
  useActorState: useReputationState,
  useMethod: useReputationMethod,
  useQueryCall: useReputationQueryCall,
  useUpdateCall: useReputationUpdateCall,
} = createActorContext<any>({
  idlFactory: moduleIdlFactory,
  withDevtools: true,
})

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
