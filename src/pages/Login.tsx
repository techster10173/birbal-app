import { IonCard, IonCardContent, IonContent, IonHeader, IonImg, IonPage } from '@ionic/react';
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
    </IonPage>
  );
};

export default Login;
