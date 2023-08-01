import { Share } from '@capacitor/share';
import type { Gesture, GestureConfig } from '@ionic/core';
import { createGesture } from '@ionic/core';
import { IonButton, IonCard, IonCardContent, IonCardHeader, IonIcon, useIonToast, useIonPopover } from '@ionic/react';
import { ellipsisVertical } from 'ionicons/icons';
import { forwardRef, useCallback, useEffect } from 'react';
import './Card.css';

const CardInner = (props: any, ref: any) => {
  const [presentToast] = useIonToast();
  const [presentPopover, dismissPopover] = useIonPopover(Popover, {
    report: async () => {
      dismissPopover();
      props.emit('REPORT');
    },
  });

  const initSwipeVerticalGesture = useCallback(() => {
    const hostElement = document.getElementById(props.adviceId) as HTMLElement;

    const gesture: Gesture = createGesture({
      el: hostElement,
      gestureName: 'pull-up',
      direction: 'y',
      threshold: 5,
      onStart: () => {
        hostElement.style.transition = 'none';
      },
      onMove: (ev) => {
        hostElement.style.transform = `translateY(${ev.deltaY}px)`;
      },
      onEnd: (ev) => {
        hostElement.style.transition = '0.4s ease-out';
        if (ev.deltaY < -window.innerHeight / 4) {
          Share.canShare().then(async ({ value }) => {
            if (value) {
              try {
                await Share.share({
                  title: 'Birbal',
                  text: `Birbal advises: ${props.children}`,
                  dialogTitle: "Share Birbal's Advice",
                });
                hostElement.style.transform = `translateY(-${window.innerHeight * 1.5}px)`;
                props.emit('SHARE');
              } catch (error) {
                hostElement.style.transform = `translateY(0px)`;
                console.error(error);
              }
            } else {
              presentToast({
                message: 'Sorry, sharing is not supported on your device.',
                duration: 2000,
                color: 'dark',
              });
            }
          });
        } else if (ev.deltaY > window.innerHeight / 4) {
          hostElement.style.transform = `translateY(${window.innerHeight * 1.5}px)`;
          props.emit('SAVE');
        } else {
          hostElement.style.transform = '';
        }
      },
    });
    gesture.enable();
  }, [presentToast, props]);

  const initSwipeGesture = useCallback(() => {
    const hostElement = document.getElementById(props.adviceId) as HTMLElement;

    const style = hostElement.style;
    const windowWidth = window.innerWidth;
    const options: GestureConfig = {
      el: hostElement,
      gesturePriority: 100,
      gestureName: 'tinder-swipe',
      onStart: () => {
        style.transition = 'none';
      },
      onMove: (ev) => {
        style.transform = `translateX(${ev.deltaX}px) rotate(${ev.deltaX / 20}deg)`;
      },
      onEnd: (ev) => {
        style.transition = '0.3s ease-out';
        if (ev.deltaX > windowWidth / 2) {
          style.transform = `translateX(${windowWidth * 1.5}px)`;
          props.emit('LIKE');
        } else if (ev.deltaX < -windowWidth / 2) {
          style.transform = `translateX(-${windowWidth * 1.5}px)`;
          props.emit('DISLIKE');
        } else {
          style.transform = '';
        }
      },
    };
    const gesture: Gesture = createGesture(options);
    gesture.enable();
  }, [props]);

  useEffect(() => {
    if (!props.adviceId) {
      return;
    }

    initSwipeGesture();
    initSwipeVerticalGesture();
  }, [initSwipeGesture, initSwipeVerticalGesture, props.adviceId]);

  return (
    <IonCard id={props.adviceId} className="swipe-card" ref={ref}>
      <IonCardHeader className="card-header">
        <IonButton
          className="select-button"
          mode="ios"
          onClick={(e: any) => {
            if (props.adviceId) {
              presentPopover({
                event: e,
              });
            }
          }}
        >
          <IonIcon slot="icon-only" icon={ellipsisVertical} />
        </IonButton>
      </IonCardHeader>
      <IonCardContent>
        <h1>{props.children}</h1>
      </IonCardContent>
    </IonCard>
  );
};

const Popover = (props: any) => (
  <IonButton className="report-button" onClick={props.report} expand="block">
    Report
  </IonButton>
);

const Card = forwardRef(CardInner);
export default Card;
