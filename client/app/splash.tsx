import React from 'react';
import { View } from 'react-native';
import { ActivityIndicator, Text } from 'react-native-paper';
import { router } from 'expo-router';
import { observeAuthState } from '@/src/config/auth';
import { registerForPushNotificationsAsync } from '@/src/utils/notifications';

export default function Splash() {
  React.useEffect(() => {
    const unsub = observeAuthState(user => {
      console.log('🚀 ~ Splash ~ user:', user);
      router.replace(user ? '/(tabs)' : '/login');
    });
    registerForPushNotificationsAsync().catch(() => {});
    return () => unsub();
  }, []);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' }}>
      <ActivityIndicator />
      <Text style={{ marginTop: 12 }}>XXXXجارٍ التحميل...</Text>
    </View>
  );
}
