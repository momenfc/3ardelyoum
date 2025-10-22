import { collection, addDoc, query, where, orderBy, getDocs, updateDoc, doc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/src/config/firebase';

export interface UserNotification {
  id: string;
  title: string;
  body: string;
  offer_ref?: string;
  is_read: boolean;
  created_at: any;
}

/**
 * Save a notification to user's subcollection in Firestore
 */
export async function saveNotificationToFirestore(userId: string, title: string, body: string, offerId?: string) {
  try {
    const notificationRef = collection(db, 'users', userId, 'notifications');
    await addDoc(notificationRef, {
      title,
      body,
      offer_ref: offerId ? `/offers/${offerId}` : null,
      is_read: false,
      created_at: serverTimestamp(),
    });
    console.log('Notification saved to Firestore');
  } catch (err) {
    console.error('Error saving notification to Firestore:', err);
  }
}

/**
 * Get all notifications for a user
 */
export async function getUserNotifications(userId: string): Promise<UserNotification[]> {
  try {
    const notificationsRef = collection(db, 'users', userId, 'notifications');
    const q = query(notificationsRef, orderBy('created_at', 'desc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(
      doc =>
        ({
          id: doc.id,
          ...doc.data(),
        } as UserNotification)
    );
  } catch (err) {
    console.error('Error fetching notifications:', err);
    return [];
  }
}

/**
 * Mark a notification as read
 */
export async function markNotificationAsRead(userId: string, notificationId: string) {
  try {
    const notificationRef = doc(db, 'users', userId, 'notifications', notificationId);
    await updateDoc(notificationRef, {
      is_read: true,
    });
  } catch (err) {
    console.error('Error marking notification as read:', err);
  }
}

/**
 * Get unread notification count
 */
export async function getUnreadNotificationCount(userId: string): Promise<number> {
  try {
    const notificationsRef = collection(db, 'users', userId, 'notifications');
    const q = query(notificationsRef, where('is_read', '==', false));
    const snapshot = await getDocs(q);
    return snapshot.size;
  } catch (err) {
    console.error('Error getting unread count:', err);
    return 0;
  }
}
