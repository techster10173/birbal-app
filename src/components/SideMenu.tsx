import {
  IonMenu,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonImg,
  IonFooter,
  IonIcon,
  useIonToast,
  useIonRouter,
  useIonAlert,
} from '@ionic/react';
import { logOut, trash } from 'ionicons/icons';
import { deleteAccount, signOut } from '../services/UserService';

const SideMenu = () => {
  const router = useIonRouter();
  const [presentToast] = useIonToast();
  const [presentAlert] = useIonAlert();

  const signOutWrapper = async () => {
    try {
      await signOut();
    } catch (error: any) {
      console.error(error);
      presentToast({
        message: error.message,
        duration: 2000,
        position: 'bottom',
      });
    }
  };

  const deleteWrapper = async () => {
    presentAlert({
      header: 'Are you sure?',
      message: 'Are you sure you want to delete your account? This action cannot be undone.',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'OK',
          role: 'confirm',
          handler: async () => {
            try {
              // TODO Delete from firebase too
              await deleteAccount();

              router.push('/login', 'root');
            } catch (error: any) {
              console.error(error);
              presentToast({
                message: error.message,
                duration: 2000,
                position: 'bottom',
              });
            }
          },
        },
      ],
    });
  };

  return (
    <IonMenu contentId="main-content">
      <IonHeader>
        <IonToolbar>
          <IonTitle>
            <IonImg className="title-img" src="./assets/birbal-word-orange.svg" />
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding" scrollY={false}>
        <IonButton expand="full" onClick={signOutWrapper}>
          <IonIcon slot="start" icon={logOut} />
          Logout
        </IonButton>
        <IonButton expand="full" color="danger" onClick={deleteWrapper}>
          <IonIcon slot="start" icon={trash} />
          Delete Account
        </IonButton>
      </IonContent>
      <IonFooter>
        <IonToolbar>
          <IonTitle
            style={{
              fontSize: '0.6rem',
              color: 'var(--ion-color-primary)',
              padding: '0%',
              textAlign: 'center',
            }}
          >
            Created by Sreesaketh Grandhe
            <br />
            Copyright 2023-2024
          </IonTitle>
        </IonToolbar>
      </IonFooter>
    </IonMenu>
  );
};

export default SideMenu;
