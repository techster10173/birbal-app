import {
  IonButtons,
  IonContent,
  IonPage,
  IonButton,
  IonHeader,
  IonToolbar,
  IonIcon,
  IonTitle,
  useIonRouter,
  useIonToast,
  useIonModal,
  createAnimation,
  IonImg,
  IonMenuButton,
} from '@ionic/react';
import { book, bookmark, thumbsDown, thumbsUp } from 'ionicons/icons';
import { useCallback, useEffect, useRef, useState } from 'react';
import AdviceCollection from '../components/AdviceCollection';
import Card from '../components/Card';
import ManualActions from '../components/ManualActions';
import './Home.css';
import { getNewAdvice, likeAdvice, dislikeAdvice, saveAdvice, reportAdvice } from '../services/AdviceService';
import LoadingCard from '../components/LoadingCard';
import SideMenu from '../components/SideMenu';
import { onAuthStateChanged } from 'firebase/auth';
import getFirebaseAuth from '../services/firebase';
import { LocalNotifications } from '@capacitor/local-notifications';

const Home: React.FC = () => {
  const router = useIonRouter();
  const [presentToast] = useIonToast();

  const [advice, setAdvice] = useState<null | {
    _id: string;
    advice: string;
  }>(null);

  const [overlayIcon, setOverlayIcon] = useState({
    color: '#2dd36f',
    icon: thumbsUp,
  });

  const addAdvice = useCallback(async () => {
    try {
      const { data } = await getNewAdvice();
      setAdvice(data);
    } catch (error: any) {
      console.error(error);
      presentToast({
        color: 'danger',
        message: 'Whoops! Something went wrong.',
        duration: 5000,
        position: 'bottom',
      });
    }
  }, [presentToast]);

  useEffect(() => {
    onAuthStateChanged(getFirebaseAuth(), (user) => {
      if (user && router.routeInfo.pathname === '/home') {
        addAdvice();
        LocalNotifications.requestPermissions().then(() => {
          LocalNotifications.schedule({
            notifications: [
              {
                title: 'Birbal',
                body: 'Birbal has a new advice for you!',
                id: 1,
              },
            ],
          });
        });
      } else {
        router.push('/login', 'root');
      }
    });
  }, []);

  const [presentAdviceCollection, dismissAdviceCollection] = useIonModal(AdviceCollection, {
    onDismiss: () => dismissAdviceCollection(),
  });

  const animationRef = useRef<HTMLIonCardElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  const handlePlayAnimation = async (likeStatus: boolean) => {
    if (animationRef.current === null) return;
    const animation = createAnimation()
      .addElement(animationRef.current)
      .duration(750)
      .keyframes([
        {
          offset: 0,
          translateX: '0%',
        },
        {
          offset: 0.5,
          transform: `translateX(${likeStatus ? '' : '-'}50%)`,
          rotate: `${likeStatus ? '' : '-'}10deg`,
        },
        {
          offset: 1,
          transform: `translateX(${likeStatus ? '' : '-'}${window.innerWidth * 1.5}px)`,
          rotate: `${likeStatus ? '' : '-'}20deg`,
        },
      ])
      .easing('ease-out');
    await animation.play();
  };

  const handleOverlayAnimation = async () => {
    if (overlayRef.current === null) return;
    const animation = createAnimation()
      .addElement(overlayRef.current)
      .duration(1000)
      .keyframes([
        {
          offset: 0,
          opacity: 1,
        },
        {
          offset: 0.5,
          opacity: 1,
          width: '150px',
          height: '150px',
        },
        {
          offset: 1,
          opacity: 0,
        },
      ])
      .easing('ease-in-out');
    await animation.play();
  };

  const handleActions = async (action: string) => {
    if (!advice) return;
    switch (action) {
      case 'LIKE':
        setOverlayIcon({
          color: 'var(--ion-color-success)',
          icon: thumbsUp,
        });
        handleOverlayAnimation();
        await likeAdvice(advice._id);
        break;
      case 'DISLIKE':
        setOverlayIcon({
          icon: thumbsDown,
          color: 'var(--ion-color-danger)',
        });
        handleOverlayAnimation();
        await dislikeAdvice(advice._id);
        break;
      case 'SAVE':
        setOverlayIcon({
          icon: bookmark,
          color: 'var(--ion-color-warning)',
        });
        handleOverlayAnimation();
        await saveAdvice(advice._id);
        await likeAdvice(advice._id);
        break;
      case 'SHARE':
        await saveAdvice(advice._id);
        await likeAdvice(advice._id);
        break;
      case 'REPORT':
        await reportAdvice(advice._id);
        await dislikeAdvice(advice._id);
        await handlePlayAnimation(false);
        break;
      default:
        break;
    }
    await addAdvice();
  };

  return (
    <>
      <SideMenu />
      <IonPage id="main-content">
        <div
          id="box"
          ref={overlayRef}
          style={{
            backgroundColor: overlayIcon.color,
          }}
        >
          <IonIcon slot="icon-only" size="large" color="light" icon={overlayIcon.icon} />
        </div>
        <IonHeader>
          <IonToolbar color="primary">
            <IonButtons slot="start">
              <IonButton slot="start">
                <IonMenuButton />
              </IonButton>
            </IonButtons>
            <IonTitle>
              <IonImg className="title-img" src="./assets/birbal-word-white.svg" />
            </IonTitle>
            <IonButtons slot="end">
              <IonButton onClick={() => presentAdviceCollection()}>
                <IonIcon slot="icon-only" icon={book} />
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent scrollY={false} fullscreen>
          <div className="card-container">
            <LoadingCard />
            {advice ? (
              <Card key={advice._id} ref={animationRef} adviceId={advice._id} emit={handleActions}>
                {advice.advice}
              </Card>
            ) : (
              <LoadingCard />
            )}
          </div>
          <ManualActions
            likeStatus={async (action) => {
              await handlePlayAnimation(action === 'LIKE');
              handleActions(action);
            }}
          />
        </IonContent>
      </IonPage>
    </>
  );
};

export default Home;
