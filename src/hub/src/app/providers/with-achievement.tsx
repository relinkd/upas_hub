import { FC, PropsWithChildren } from 'react';
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
  useUpdateCall: useAchivementUpdateCall,
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

export const WithAchievementProvider: FC<PropsWithChildren> = ({ children }) => {

  const { postMessage } = useSelector(userModel.selectors.getUser);

  console.log(postMessage?.achievement, postMessage?.reputation_module, 'messagepost')

  return(
    <ReputationProvider canisterId={postMessage?.reputation_module || 'ctiya-peaaa-aaaaa-qaaja-cai'}>
        <AchievementProvider canisterId={postMessage?.achievement || 'ctiya-peaaa-aaaaa-qaaja-cai'}>
          {children}
        </AchievementProvider>
    </ReputationProvider>
  )
};
