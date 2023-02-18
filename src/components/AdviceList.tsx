import {
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonButton,
  IonCard,
  IonCardContent,
  IonRefresher,
  IonRefresherContent,
  useIonLoading,
  useIonToast,
} from '@ionic/react';
import { useEffect, useState } from 'react';

const AdviceList = (props: any) => {
  const [offset, setOffset] = useState(0);
  const [advices, setAdvices] = useState<any[]>([]);

  const [presentLoading, dismissLoading] = useIonLoading();
  const [presentToast] = useIonToast();

  const populateAdvices = async () => {
    presentLoading();
    try {
      const { data } = await props.getAdvice(offset);
      setAdvices(offset === 0 ? data : [...advices, ...data]);
    } catch (e) {
      console.error(e);
      presentToast('Something went wrong', 2000);
    }
    dismissLoading();
  };

  useEffect(() => {
    populateAdvices();
  }, []);

  const removeWrapper = async (id: string) => {
    await props.removeAdvice(id);
    await populateAdvices();
  };

  return (
    <>
      <IonRefresher
        slot="fixed"
        onIonRefresh={async (ev) => {
          setOffset(0);
          await populateAdvices();
          (ev.target as HTMLIonRefresherElement).complete();
        }}
      >
        <IonRefresherContent></IonRefresherContent>
      </IonRefresher>
      {advices.map((advice: any) => (
        <IonCard key={advice._id}>
          <IonCardContent>{advice.advice}</IonCardContent>
          <IonButton fill="clear" color="danger" onClick={() => removeWrapper(advice._id)}>
            {props.message}
          </IonButton>
        </IonCard>
      ))}
      <IonInfiniteScroll
        onIonInfinite={async (ev) => {
          setOffset(offset + 1);
          await populateAdvices();
          (ev.target as HTMLIonInfiniteScrollElement).complete();
        }}
      >
        <IonInfiniteScrollContent />
      </IonInfiniteScroll>
    </>
  );
};

export default AdviceList;
