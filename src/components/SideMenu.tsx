import { IonMenu, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonImg, IonFooter, IonIcon, useIonToast, useIonRouter } from "@ionic/react"
import { logOut, trash } from "ionicons/icons"
import { signOut, deleteAccount } from '../services/UserService';

const SideMenu = () => {
    const router = useIonRouter();
    const [presentToast] = useIonToast();

    const signOutWrapper = async () => {
        try {
          await signOut();
          router.push('/login', 'root');
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
        try {
            await deleteAccount();
            await signOut();
            router.push('/login', 'root');
        } catch (error: any) {
            console.error(error);
            presentToast({
                message: error.message,
                duration: 2000,
                position: 'bottom',
            });
        }
    }

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
                    padding: '0%'
                }}
            >
                Created by Sreesaketh Grandhe
                <br />
                Copyright 2023-2024
            </IonTitle>
            </IonToolbar>
      </IonFooter>
    </IonMenu>
    )
}

export default SideMenu