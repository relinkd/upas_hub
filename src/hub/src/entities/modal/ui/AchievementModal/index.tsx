import { forwardRef } from 'react';
import { Stack, Typography, Box } from '@mui/material';
import { Modal, modalModel } from 'entities/modal';
import { ModalWrapper } from '../ModalWrapper';
import { userModel } from 'entities/user';
import { useShallowSelector, COLOR_LIGHTER_GRAY, BORDER_RADIUS_M, BORDER, COLOR_BORDER_PURPLE, COLOR_BLACK } from 'shared';
import { useQueryCall } from '@ic-reactor/react';
import { Principal } from '@dfinity/principal';


export interface AchievementModalPayload {
  type: modalModel.Modals.AchievementModal;
  data?: { collection: string, id: number };
}

export const AchievementModal = forwardRef<HTMLElement, Modal>(({ data: { collection, id } }) => {
    const { data: issuer, call: refetchIssuer }: { data: any, call: any} = useQueryCall({
        functionName: "getIssuer",
        args: [
            Principal.fromText(collection)
        ]
    })
    
    const { achievements } = useShallowSelector(userModel.selectors.getUser);

    return (
        <ModalWrapper size="md" title='Achievement card'>
            <Stack justifyContent="space-between" flexDirection="row">
                <Typography>Name:</Typography>
                <Typography>{achievements[collection][id].Name}</Typography>
            </Stack>
            <Stack justifyContent="space-between" flexDirection="row">
                <Typography>Description:</Typography>
                <Typography>{achievements[collection][id].Description}</Typography>
            </Stack>
            <Stack direction="row" sx={{
                width: '100%',
                paddingX: '5%',
                height: '65px',
                margin: '0 auto',
                backgroundColor: COLOR_LIGHTER_GRAY,
                borderRadius: BORDER_RADIUS_M,
                alignItems: 'center',
                justifyContent: 'space-between',
                border: BORDER,
                borderColor: COLOR_BORDER_PURPLE,
                marginBottom: 2
            }}>
                <Stack direction="row">
                    <Typography>Issued by:</Typography>
                    <Typography sx={{color: COLOR_BLACK, textDecoration: "underline"}}>{issuer?.Ok?.name}</Typography>
                </Stack>
                <Stack direction="row">
                    <Typography>Verified:</Typography>
                    <Typography sx={{color: COLOR_BLACK, textDecoration: "underline"}}>{issuer?.Ok?.verified ? 'Yes' : 'No'}</Typography>
                </Stack>
            </Stack>
        </ModalWrapper>
    );
});

AchievementModal.displayName = 'AchievementModal';
