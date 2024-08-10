import { FC, PropsWithChildren } from 'react';
import { canisterId as achievementCanisterId, idlFactory } from '../../../../declarations/achievement';
import { createActorContext } from "@ic-reactor/react";
import { useParams } from "react-router-dom";

export const {
  ActorProvider: AchievementProvider,
  useActorState: useAchievementState,
  useMethod: useAchievementMethod,
  useQueryCall: useAchievementQueryCall,
  useUpdateCall: useAchivementUpdateCall,
} = createActorContext<any>({
  canisterId: achievementCanisterId,
  idlFactory,
  withDevtools: true,
})

export const WithAchievementProvider: FC<PropsWithChildren> = ({ children }) => {

  let { reputation_module, achievement} = useParams(); 

  return (
    <AchievementProvider>
      {children}
    </AchievementProvider>
  );
};
