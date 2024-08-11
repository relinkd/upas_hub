import { forwardRef } from 'react';
import { Box } from '@mui/material';
import { Modal, modalModel } from 'entities/modal';
import { ModalWrapper } from '../ModalWrapper';


export interface AchievementModalPayload {
  type: modalModel.Modals.AchievementModal;
  data?: null;
}

export const AchievementModal = forwardRef<HTMLElement, Modal>(() => {
  return <ModalWrapper size="md" title='achievement'>test</ModalWrapper>;;
});

AchievementModal.displayName = 'AchievementModal';
