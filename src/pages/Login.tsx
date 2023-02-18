import {
  IonCard,
  IonCardContent,
  IonContent,
  IonFooter,
  IonHeader,
  IonImg,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { useState } from 'react';

import SignIn from '../components/SignIn';
import SignUp from '../components/SignUp';
import './Login.css';

const Login: React.FC = () => {
  const [loginScreen, setLoginScreen] = useState(true);

  return (
    <IonPage>
      <IonHeader />
      <IonContent fullscreen color="primary">
        <IonImg className="primary-img" src="assets/birbal-icon-white.svg" />
        <IonCard>
          <IonCardContent>
            {loginScreen ? (
              <SignIn switchToSignUp={() => setLoginScreen(false)} />
            ) : (
              <SignUp switchToSignIn={() => setLoginScreen(true)} />
            )}
          </IonCardContent>
        </IonCard>
      </IonContent>
      <IonFooter className="ion-no-border">
        <IonToolbar>
          <IonTitle
            style={{
              fontSize: '0.6rem',
              backgroundColor: 'var(--ion-color-primary)',
              color: 'var(--ion-color-dark-tint)',
            }}
          >
            Created by Sreesaketh Grandhe
            <br />
            Copyright 2023-2024
          </IonTitle>
        </IonToolbar>
      </IonFooter>
    </IonPage>
  );
};

export default Login;
