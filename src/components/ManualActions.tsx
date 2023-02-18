import type { OverlayEventDetail } from '@ionic/core/components';
import { IonFab, IonFabButton, IonIcon, useIonModal } from '@ionic/react';
import { thumbsDown, addCircle, thumbsUp } from 'ionicons/icons';
import { createAdvice } from '../services/AdviceService';
import AdvisorCreator from './AdviceCreator';

const ManualActions = ({ likeStatus }: { likeStatus: (status: string) => void }) => {
  const [presentAdvisorCreator, dismissAdvisorCreator] = useIonModal(AdvisorCreator, {
    onDismiss: (data: string, role: string) => dismissAdvisorCreator(data, role),
  });

  function openAdvisorCreatorModal() {
    presentAdvisorCreator({
      onWillDismiss: async (ev: CustomEvent<OverlayEventDetail>) => {
        if (ev.detail.role !== 'confirm') return;
        await createAdvice(ev.detail.data);
      },
    });
  }

  return (
    <>
      <IonFab slot="fixed" vertical="bottom" horizontal="start">
        <IonFabButton size="small" color="danger" onClick={() => likeStatus('DISLIKE')}>
          <IonIcon icon={thumbsDown}></IonIcon>
        </IonFabButton>
      </IonFab>
      <IonFab slot="fixed" vertical="bottom" horizontal="center">
        <IonFabButton onClick={openAdvisorCreatorModal}>
          <IonIcon icon={addCircle}></IonIcon>
        </IonFabButton>
      </IonFab>
      <IonFab slot="fixed" vertical="bottom" horizontal="end">
        <IonFabButton size="small" color="success" onClick={() => likeStatus('LIKE')}>
          <IonIcon icon={thumbsUp}></IonIcon>
        </IonFabButton>
      </IonFab>
    </>
  );
};

export default ManualActions;
