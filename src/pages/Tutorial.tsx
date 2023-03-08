import { IonContent, IonFab, IonFabButton, IonIcon, IonPage, useIonRouter } from '@ionic/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { bookmark, checkmarkCircle, share, thumbsDown, thumbsUp } from 'ionicons/icons';
import { Autoplay } from 'swiper';

import 'swiper/swiper.min.css';
import '@ionic/react/css/ionic-swiper.css';
import './Tutorial.css';

const Tutorial: React.FC = () => {
  const router = useIonRouter();

  return (
    <IonPage>
      <IonContent fullscreen scrollY={false}>
        <Swiper className="swiper-container" modules={[Autoplay]} autoplay={true}>
          <SwiperSlide>
            <div className="tutorial-icon thumbs-up">
              <IonIcon slot="icon-only" size="large" icon={thumbsUp} color="light" />
            </div>
            <h1 className="tutorial-label">Swipe right to like</h1>
          </SwiperSlide>
          <SwiperSlide>
            <div className="tutorial-icon thumbs-down">
              <IonIcon slot="icon-only" size="large" icon={thumbsDown} color="light" />
            </div>
            <h1 className="tutorial-label">Swipe left to dislike</h1>
          </SwiperSlide>
          <SwiperSlide>
            <div className="tutorial-icon save">
              <IonIcon slot="icon-only" size="large" icon={bookmark} color="light" />
            </div>
            <h1 className="tutorial-label">Swipe down to save</h1>
          </SwiperSlide>
          <SwiperSlide>
            <div className="tutorial-icon share">
              <IonIcon slot="icon-only" size="large" icon={share} color="light" />
            </div>
            <h1 className="tutorial-label">Swipe up to share</h1>
          </SwiperSlide>
        </Swiper>
        <IonFab slot="fixed" vertical="bottom" horizontal="end">
          <IonFabButton color="tertiary" onClick={() => router.push('/', 'root')}>
            <IonIcon icon={checkmarkCircle}></IonIcon>
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default Tutorial;
