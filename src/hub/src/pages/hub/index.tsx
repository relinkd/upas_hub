import { Typography, Stack, Button } from '@mui/material';
import { Layout, UserBlock, Achievements as AchievementsWidget } from 'widgets';
import { useQueryCall, useAuth, useAgent } from '@ic-reactor/react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Achievements, useShallowSelector, getToastMessage } from 'shared';
import { userModel } from 'entities/user';
import { useAchievementUpdateCall, useReputationUpdateCall } from 'app/providers';
import { Principal } from '@dfinity/principal';
import { modalModel } from 'entities/modal';
import { Modals } from 'entities/modal/model';


export const HubPage = () => {

  const dispatch = useDispatch();

  const {login, authenticated, identity} = useAuth();

  const { postMessage, achievements: achievementsCurrent } = useShallowSelector(userModel.selectors.getUser)

  const { data: achievements, call: refetchAchievements } = useQueryCall({
    functionName: "getPrincipalAchievementsMetadata",
    args: [
      identity?.getPrincipal()
    ]
  })

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



  useEffect(() => {
    let typedAch = achievements as Achievements;

    const result: Record<string, Record<string, string>[]> = {};

    if(!achievements) return;

    typedAch?.Ok.forEach(([principal, achievementArray]) => {
      const principalKey = principal?.toText() as string;
      

      result[principalKey] = [];
  
      achievementArray.forEach((fields) => {
        const innerObject: Record<string, string> = {};
        fields.forEach((field) => {
          const typedField = field as unknown as [string, {Text: string}];
          innerObject[typedField[0]] = typedField[1].Text;
        })
        result[principalKey].push(innerObject); 
      });
    });

    if (JSON.stringify(result) !== JSON.stringify(achievementsCurrent)) {
      dispatch(
        userModel.userActions.updateUserState({
          achievements: result
        })
      )
    }
  }, [achievements])

  const receiveAchievement = async () => {
    const receiveWithHashResult = await receiveWithHash();
    console.log(receiveWithHashResult, 'hash result');
    const mintAchievementResult = await mintAchievement();
    console.log(mintAchievementResult, 'mint result');
  }

  useEffect(() => {
    if(postMessage?.type === "SELECT_IDENTITY") {
      window.opener.postMessage({
        type: 'RETURN_IDENTITY',
        payload: identity?.getPrincipal()?.toText()
      }, "http://localhost:5174")
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
  }, [postMessage])
  
  return (
    <Layout>
      <Stack flexDirection="column" alignItems="center" width={1} maxWidth={1}>
        <UserBlock />
        <AchievementsWidget />
      </Stack>
    </Layout>
  );
};
