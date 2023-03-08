import {
  IonHeader,
  IonToolbar,
  IonButtons,
  IonButton,
  IonTitle,
  IonContent,
  IonPage,
  IonTextarea,
  IonFab,
  IonFabButton,
  IonIcon,
  IonCard,
  IonCardContent,
} from '@ionic/react';
import { checkmark } from 'ionicons/icons';
import { useState } from 'react';

const AdvisorCreator = ({ onDismiss }: { onDismiss: (data?: string | null, role?: string) => void }) => {
  const [advice, setAdvice] = useState('');

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonButton onClick={() => onDismiss(null, 'cancel')}>
              Cancel
            </IonButton>
          </IonButtons>
          <IonTitle>Create Advice</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent scrollY={true} className="ion-padding">
        <IonCard>
          <IonCardContent>
            <IonTextarea
              debounce={20}
              rows={25}
              maxlength={250}
              placeholder="Let's hear some snippets of wisdom..."
              onIonInput={(e) => setAdvice(e.target.value as string)}
            />
            <p>{250 - advice.length} characters left</p>
          </IonCardContent>
        </IonCard>

        <IonFab slot="fixed" vertical="bottom" horizontal="end">
          <IonFabButton color="primary" onClick={() => onDismiss(advice, 'confirm')}>
            <IonIcon icon={checkmark} />
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default AdvisorCreator;
