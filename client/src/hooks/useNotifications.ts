import { useEffect, useRef } from 'react';
import * as Notifications from 'expo-notifications';
import { router } from 'expo-router';
import { registerForPushNotificationsAsync, listenToNotifications } from '@/src/utils/notifications';
import { useUserStore } from '@/src/stores/userStore';

export function useNotifications() {
  const uid = useUserStore(state => state.uid);
  const notificationListener = useRef<any>(null);
  const responseListener = useRef<any>(null);

  useEffect(() => {
    // Register for push notifications when user logs in
    if (uid) {
      registerForPushNotificationsAsync(uid)
        .then(token => {
          console.log('Push token:', token);
        })
        .catch(err => {
          console.error('Error registering for push notifications:', err);
        });
    }

    // Listen to notifications
    const cleanup = listenToNotifications(
      notification => {
        console.log('Notification received:', notification);
        // Handle foreground notification
      },
      response => {
        console.log('Notification tapped:', response);
        // Handle notification tap
        const data = response.notification.request.content.data;
        if (data?.offerId) {
          router.push(`/offer/${data.offerId}`);
        }
      }
    );

    return cleanup;
  }, [uid]);
}
