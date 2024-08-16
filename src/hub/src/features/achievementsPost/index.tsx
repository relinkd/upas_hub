import { Achievements as AchievementsType, useShallowSelector, getToastMessage } from 'shared';
import { userModel } from 'entities/user';
import { useQueryCall, useAuth } from '@ic-reactor/react';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { modalModel } from 'entities/modal';
import { Modals } from 'entities/modal/model';
import { useReputationUpdateCall, useAchievementUpdateCall, useAchievementState, useReputationState } from 'app/providers';
import { Principal } from '@dfinity/principal';


export const AchievementsPost = () => {
    const dispatch = useDispatch();
    const { identity } = useAuth();

    const { postMessage } = useShallowSelector(userModel.selectors.getUser)
    const { canisterId } = useAchievementState();
    const { canisterId: reputationCanisterId } = useReputationState();

    const { call: receiveWithHash }: { call: any } = useAchievementUpdateCall({
      functionName: "receiveAchievementFromIdentityWalletWithHash",
      args: [
          Principal.fromText(postMessage?.data || identity!.getPrincipal()!.toText())
      ] 
    })
  
    const { call: mintAchievement }: { call: any } = useReputationUpdateCall({
      functionName: "issueAchievementToIdentityWallet",
      args: [
          Principal.fromText(postMessage?.achievement || identity!.getPrincipal()!.toText())
      ] 
    })
  
    const receiveAchievement = async () => {
      const receiveWithHashResult = await receiveWithHash();
      console.log(receiveWithHashResult, 'hash result');
      const mintAchievementResult = await mintAchievement();
      console.log(mintAchievementResult, 'mint result');
    }
    useEffect(() => {
      console.log(canisterId, 'canisterID')
      if(canisterId === '2vxsx-fae' || reputationCanisterId === '2vxsx-fae' ) return

      if(postMessage?.type === "SELECT_IDENTITY") {
        window.opener.postMessage({
          type: 'RETURN_IDENTITY',
          payload: identity?.getPrincipal()?.toText()
        }, postMessage.reputation_requester);
        getToastMessage('success', 'Identity Selected');
        setTimeout(() => {
          window.close()
        }, 2000)
      } else if(postMessage?.type === "SIGN_SIGNATURE") {
        console.log('receive achievement')
        dispatch(
          modalModel.modalActions.openModal({
            type: Modals.ReceiveAchievementModal,
            data: {
              receiveAchievementFunc: receiveAchievement
            },
          }),
        );
      }
    }, [canisterId])
  
    return (<></>)
  };
  