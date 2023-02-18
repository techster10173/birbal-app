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
} from '@ionic/react';
import { useState } from 'react';
import { Preferences } from '@capacitor/preferences';
import { signIn } from '../services/UserService';

const SignIn = (props: any) => {
  const [email, setEmail] = useState('sreegrandhe@gmail.com');
  const [password, setPassword] = useState('password');

  const [present, dismiss] = useIonLoading();
  const [presentToast] = useIonToast();

  const router = useIonRouter();

  // const forgotPassAlert = () => {
  //   presentAlert({
  //     header: 'Forgot Password',
  //     message: 'Please enter your email address to reset your password.',
  //     inputs: [
  //       {
  //         name: 'email',
  //         type: 'email',
  //         placeholder: 'Email',
  //       },
  //     ],
  //     buttons: [
  //       'Cancel',
  //       {
  //         text: 'Send',
  //         handler: (alertData) => {
  //           sendPasswordResetEmail(auth, alertData.email);
  //         },
  //       },
  //     ],
  //   });
  // };

  const login = async () => {
    try {
      present({ message: 'Logging in...' });
      const { data } = await signIn(email, password);
      await Preferences.set({ key: 'token', value: data.token });
      router.push('/home', 'root');
    } catch (error: any) {
      let message = '';
      switch (error.response.status) {
        case 400:
          message = 'Invalid email or password';
          break;
        case 500:
          message = 'Server error';
          break;
        default:
          message = 'Unknown error';
      }
      presentToast({
        message: message,
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
      {/* <p onClick={forgotPassAlert}>Forgot Password?</p> */}
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
