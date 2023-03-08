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
  const [disableInfiniteScroll, setDisableInfiniteScroll] = useState(false);

  const [presentLoading, dismissLoading] = useIonLoading();
  const [presentToast] = useIonToast();

  const populateAdvices = async (newOffset: number) => {
    try {
      const { data } = await props.getAdvice(newOffset);
      setAdvices(newOffset === 0 ? data : [...advices, ...data]);
      setOffset(newOffset);
      setDisableInfiniteScroll(data.length === 0);
    } catch (e) {
      console.error(e);
      presentToast('Something went wrong', 2000);
    }
  }

  useEffect(() => {
    presentLoading();
    populateAdvices(0).then(dismissLoading);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const removeWrapper = async (id: string) => {
    await props.removeAdvice(id);
    await populateAdvices(0);
  };

  return (
    <>
      <IonRefresher
        slot="fixed"
        onIonRefresh={async (ev) => {
          await populateAdvices(0);
          await (ev.target as HTMLIonRefresherElement).complete();
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
        disabled={disableInfiniteScroll}
        onIonInfinite={async (ev) => {
          await populateAdvices(offset + 1);
          await (ev.target as HTMLIonInfiniteScrollElement).complete();
        }}
      >
        <IonInfiniteScrollContent />
      </IonInfiniteScroll>
    </>
  );
};

export default AdviceList;
