import { forwardRef } from 'react';
import { Stack, Button, Typography } from '@mui/material';
import { Modal, modalModel } from 'entities/modal';
import { ModalWrapper } from '../ModalWrapper';
import { useShallowSelector, COLOR_LIGHTER_GRAY, BORDER_RADIUS_M, BORDER, COLOR_BORDER_PURPLE, COLOR_BLACK, getToastMessage } from 'shared';
import { modalActions } from '../../model';
import { useDispatch } from 'react-redux';


export interface ReceiveAchievementModalPayload {
  type: modalModel.Modals.ReceiveAchievementModal;
  data?: { receiveAchievementFunc: any };
}

const { closeModal } = modalActions;

export const ReceiveAchievementModal = forwardRef<HTMLElement, Modal>(({ data: { receiveAchievementFunc } }) => {
    const dispatch = useDispatch();

    return (
        <ModalWrapper size="sm" title=''>
            <Stack justifyContent="center" flexDirection="row">
                <Typography sx={{textAlign: 'center'}} variant='h5'>Do You Want to Receive this Achievement?</Typography>
            </Stack>
            <Button onClick={async () => {
                await receiveAchievementFunc()
                getToastMessage('success', 'Achievement received');
                window.opener.postMessage({
                    type: 'RECEIVED_ACHIEVEMENT',
                    payload: ''
                  }, "http://localhost:5174");
                setTimeout(() => {
                    window.close()
                }, 3000)
            }} sx={{
                marginTop: 8,
                backgroundColor: '#272440',
                '&:hover': {
                    color: COLOR_LIGHTER_GRAY
                }
            }}>Confirm</Button>
            <Button sx={{
                marginTop: 1,
                backgroundColor: '#F3F2FB',
                color: COLOR_BLACK,
                '&:hover': {
                    color: COLOR_LIGHTER_GRAY
                }
            }} onClick={() => {
                dispatch(closeModal())
            }}>Cancel</Button>
        </ModalWrapper>
    );
});

ReceiveAchievementModal.displayName = 'ReceiveAchievementModal';
