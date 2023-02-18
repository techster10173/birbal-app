import {
  IonSegment,
  IonSegmentButton,
  IonPage,
  IonContent,
  IonHeader,
  IonToolbar,
  IonButton,
  IonButtons,
  IonTitle,
} from '@ionic/react';
import { useState } from 'react';

import CreatedAdvice from './CreatedAdvice';
import LikedAdvice from './SavedAdvice';

const AdviceCollection = ({ onDismiss }: { onDismiss: () => void }) => {
  const [segment, setSegment] = useState('default');

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonButton onClick={() => onDismiss()}>Cancel</IonButton>
          </IonButtons>
          <IonTitle>My Advices</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonSegment value={segment} onIonChange={(event) => setSegment(event.detail.value as string)}>
          <IonSegmentButton value="default">Created</IonSegmentButton>
          <IonSegmentButton value="other">Favorites</IonSegmentButton>
        </IonSegment>
        {segment !== 'default' ? <LikedAdvice /> : <CreatedAdvice />}
      </IonContent>
    </IonPage>
  );
};

export default AdviceCollection;
