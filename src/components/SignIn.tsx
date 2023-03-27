/* eslint-disable jsx-a11y/anchor-is-valid */
import {
  IonList,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  useIonToast,
  useIonRouter,
  useIonLoading,
  useIonAlert,
} from '@ionic/react';
import { useState } from 'react';
import { signIn, sendPasswordResetEmail } from '../services/UserService';

const SignIn = (props: any) => {
  const [email, setEmail] = useState('sreegrandhe@gmail.com');
  const [password, setPassword] = useState('password');

  const [present, dismiss] = useIonLoading();
  const [presentToast] = useIonToast();
  const [presentAlert] = useIonAlert();

  const router = useIonRouter();

  const forgotPassAlert = () => {
    presentAlert({
      header: 'Forgot Password',
      message: 'Please enter your email address to reset your password.',
      inputs: [
        {
          name: 'email',
          type: 'email',
          value: email,
        },
      ],
      buttons: [
        'Cancel',
        {
          text: 'Send',
          handler: (alertData) => {
            sendPasswordResetEmail(email || alertData.email);
          },
        },
      ],
    });
  };

  const login = async () => {
    try {
      present({ message: 'Logging in...' });
      await signIn(email, password);
      router.push('/home', 'root');
    } catch (error: any) {
      presentToast({
        message: error,
        duration: 2000,
        position: 'bottom',
      });
    } finally {
      dismiss();
    }
  };

  return (
    <IonList>
      <IonItem>
        <IonLabel position="floating">Email</IonLabel>
        <IonInput inputmode="email" onInput={(e) => setEmail((e.target as HTMLInputElement).value)} />
      </IonItem>
      <IonItem>
        <IonLabel position="floating">Password</IonLabel>
        <IonInput type="password" onInput={(e) => setPassword((e.target as HTMLInputElement).value)} />
      </IonItem>
      <p onClick={forgotPassAlert}>Forgot Password?</p>
      <IonButton className="submitButton" onClick={login}>
        Login
      </IonButton>
      <p>
        New to Birbal? <a onClick={() => props.switchToSignUp()}>Sign up!</a>
      </p>
    </IonList>
  );
};

export default SignIn;
