import React, { useEffect, useState } from 'react';
import { View, FlatList, TouchableOpacity } from 'react-native';
import { Text, ActivityIndicator, Divider, Badge, Button } from 'react-native-paper';
import { router } from 'expo-router';
import { getUserNotifications, markNotificationAsRead, UserNotification } from '@/src/services/notificationService';
import { db } from '@/src/config/firebase';
import { onSnapshot, collection, query, orderBy } from 'firebase/firestore';
import { useSettingsStore } from '@/src/stores/settingsStore';
import { useUserStore } from '@/src/stores/userStore';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function NotificationsScreen() {
  const uid = useUserStore(state => state.uid);
  const [notifications, setNotifications] = useState<UserNotification[]>([]);
  const [loading, setLoading] = useState(true);
  const [markingAll, setMarkingAll] = useState(false);
  const primary = useSettingsStore(s => s.settings?.primary_color || '#FFA500');

  useEffect(() => {
    if (!uid) return;
    setLoading(true);
    const q = query(collection(db, 'users', uid, 'notifications'), orderBy('created_at', 'desc'));
    const unsub = onSnapshot(q, snap => {
      setNotifications(snap.docs.map(d => ({ id: d.id, ...d.data() } as UserNotification)));
      setLoading(false);
    });
    return () => unsub();
  }, [uid]);

  const handleMarkAllAsRead = async () => {
    if (!uid) return;
    setMarkingAll(true);
    try {
      // Mark all unread notifications as read in Firestore
      const unread = notifications.filter(n => !n.is_read);
      await Promise.all(unread.map(n => markNotificationAsRead(uid, n.id)));
      setNotifications(prev => prev.map(n => ({ ...n, is_read: true })));
    } catch (err) {
      // Optionally show error
    } finally {
      setMarkingAll(false);
    }
  };

  const handleNotificationPress = async (notification: UserNotification) => {
    if (!uid) return;

    // Mark as read
    if (!notification.is_read) {
      await markNotificationAsRead(uid, notification.id);
      setNotifications(prev => prev.map(n => (n.id === notification.id ? { ...n, is_read: true } : n)));
    }

    // Navigate to offer if available
    if (notification.offer_ref) {
      const offerId = notification.offer_ref.split('/').pop();
      router.push(`/offer/${offerId}`);
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>
        <ActivityIndicator />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={{ padding: 16, backgroundColor: primary, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <Text variant="headlineSmall" style={{ fontFamily: 'Cairo_700Bold', textAlign: 'right', color: '#fff' }}>
          الإشعارات
        </Text>
        {notifications.some(n => !n.is_read) && (
          <Button
            mode="contained-tonal"
            onPress={handleMarkAllAsRead}
            loading={markingAll}
            disabled={markingAll}
            style={{ borderRadius: 20, marginLeft: 8 }}
            labelStyle={{ fontSize: 12 }}>
            تعليم الكل كمقروء
          </Button>
        )}
      </View>

      <FlatList
        data={notifications}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleNotificationPress(item)}>
            <View style={{ padding: 16, backgroundColor: item.is_read ? '#fff' : '#FFF8E1' }}>
              <View style={{ flexDirection: 'row-reverse', alignItems: 'center', gap: 8 }}>
                <Text variant="titleMedium" style={{ fontFamily: 'Cairo_700Bold', textAlign: 'right', flex: 1, color: '#333' }}>
                  {item.title}
                </Text>
                {!item.is_read && <View style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: '#2196f3', marginStart: 4 }} />}
              </View>
              <Text style={{ textAlign: 'right', color: '#666', marginTop: 4 }}>{item.body}</Text>
              <Text style={{ textAlign: 'right', color: '#999', fontSize: 12, marginTop: 4 }}>
                {item.created_at?.toDate?.()?.toLocaleDateString('ar-EG') || ''}
              </Text>
            </View>
            <Divider />
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <View style={{ padding: 32, alignItems: 'center' }}>
            <Text style={{ textAlign: 'center', color: '#666' }}>لا توجد إشعارات</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}
