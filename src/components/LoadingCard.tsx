import { IonSkeletonText, IonLabel } from '@ionic/react';
import Card from './Card';

const LoadingCard = () => (
  <Card key="loader">
    <IonLabel>
      <h1>
        <IonSkeletonText animated={true} style={{ width: '80%' }} />
      </h1>
      <h1>
        <IonSkeletonText animated={true} style={{ width: '60%' }} />
      </h1>
      <h1>
        <IonSkeletonText animated={true} style={{ width: '30%' }} />
      </h1>
    </IonLabel>
  </Card>
);

export default LoadingCard;
