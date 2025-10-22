import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/src/config/firebase';
import { useSettingsStore } from '@/src/stores/settingsStore';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export async function registerForPushNotificationsAsync(userId?: string) {
  let token: string | undefined;
  const primary = useSettingsStore.getState().settings?.primary_color || '#FFA500';

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'عروض اليوم',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: primary,
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      throw new Error('Permission not granted for notifications');
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;

    // Save token to Firestore if userId is provided
    if (userId && token) {
      await saveNotificationToken(userId, token);
    }
  } else {
    console.warn('Must use physical device for Push Notifications');
  }

  return token;
}

export async function saveNotificationToken(userId: string, token: string) {
  try {
    await setDoc(
      doc(db, 'users', userId),
      {
        push_token: token,
        push_token_updated_at: serverTimestamp(),
      },
      { merge: true }
    );
    console.log('Push token saved to Firestore:', token);
  } catch (err) {
    console.error('Error saving push token:', err);
  }
}

export async function scheduleLocalNotification(title: string, body: string, data?: any) {
  await Notifications.scheduleNotificationAsync({
    content: {
      title,
      body,
      data,
      sound: true,
    },
    trigger: null, // Show immediately
  });
}

export function listenToNotifications(
  onNotificationReceived: (notification: Notifications.Notification) => void,
  onNotificationResponse: (response: Notifications.NotificationResponse) => void
) {
  const receivedSubscription = Notifications.addNotificationReceivedListener(onNotificationReceived);
  const responseSubscription = Notifications.addNotificationResponseReceivedListener(onNotificationResponse);

  return () => {
    receivedSubscription.remove();
    responseSubscription.remove();
  };
}
