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
import { signUp } from '../services/UserService';

const SignUp = (props: any) => {
  const [newEmail, setNewEmail] = useState('');
  const [newPass, setNewPass] = useState('');
  const [rePass, setRePass] = useState('');

  const [presentToast] = useIonToast();
  const [present, dismiss] = useIonLoading();

  const router = useIonRouter();

  const createAccount = async () => {
    if (newPass !== rePass) {
      presentToast('Passwords do not match!');
      return;
    }

    try {
      present({ message: 'Creating account...' });
      await signUp(newEmail, newPass);
      router.push('/tutorial', 'root');
    } catch (error: any) {
      console.error(error);
      presentToast({
        message: error?.response?.data?._id ? 'Email already exists' : 'Whoops! Something went wrong.',
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
        <IonInput inputmode="email" onInput={(e) => setNewEmail((e.target as HTMLInputElement).value)} />
      </IonItem>
      <IonItem>
        <IonLabel position="floating">Password</IonLabel>
        <IonInput type="password" onInput={(e) => setNewPass((e.target as HTMLInputElement).value)} />
      </IonItem>
      <IonItem>
        <IonLabel position="floating">Re-Input Password</IonLabel>
        <IonInput type="password" onInput={(e) => setRePass((e.target as HTMLInputElement).value)}></IonInput>
      </IonItem>
      <IonButton className="submitButton" onClick={createAccount}>
        Sign Up
      </IonButton>
      <p>
        Back to <a onClick={() => props.switchToSignIn()}>Login!</a>
      </p>
    </IonList>
  );
};

export default SignUp;
