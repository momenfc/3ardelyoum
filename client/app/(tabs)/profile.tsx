import React from 'react';
import { View, Linking } from 'react-native';
import { Text, Switch, Button, Divider, ActivityIndicator } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useUserStore } from '@/src/stores/userStore';
import { useRouter } from 'expo-router';
import { useUserInfo } from '@/src/hooks/useUserInfo';
import { useSettingsStore } from '@/src/stores/settingsStore';
import { logout } from '@/src/config/auth';

export default function ProfileScreen() {
  const { uid, email, clearUser, isAdmin } = useUserStore();
  const router = useRouter();
  const { info, loading } = useUserInfo();
  const [notifEnabled, setNotifEnabled] = React.useState(true); // stub
  const [darkMode, setDarkMode] = React.useState(false); // stub
  const appName = useSettingsStore(s => s.settings?.app_name || '3ard ElYoum');
  const supportEmail = useSettingsStore(s => s.settings?.support_email || 'support@3ardelyoum.com');

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff', padding: 16 }}>
      <Text variant="headlineMedium" style={{ fontFamily: 'Cairo_700Bold', marginBottom: 16 }}>
        الملف الشخصي
      </Text>
      <Divider style={{ marginBottom: 16 }} />
      {isAdmin && (
        <Button mode="contained" style={{ marginBottom: 16, backgroundColor: '#1976d2' }} onPress={() => router.push('/admin')}>
          لوحة تحكم المشرف
        </Button>
      )}
      {loading ? (
        <ActivityIndicator />
      ) : (
        <View style={{ marginBottom: 24 }}>
          <Text style={{ fontFamily: 'Cairo_700Bold', fontSize: 18, marginBottom: 8 }}>معلومات المستخدم</Text>
          <Text style={{ color: '#333', marginBottom: 4 }}>الاسم: {info?.name || '-'}</Text>
          <Text style={{ color: '#333', marginBottom: 4 }}>البريد الإلكتروني: {email || info?.email || '-'}</Text>
          <Text style={{ color: '#333', marginBottom: 4 }}>رقم المستخدم (UID): {uid || '-'}</Text>
        </View>
      )}
      <Divider style={{ marginBottom: 16 }} />
      <View style={{ flexDirection: 'row-reverse', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
        <Text style={{ fontSize: 16 }}>تفعيل الإشعارات</Text>
        <Switch value={notifEnabled} onValueChange={setNotifEnabled} />
      </View>
      <View style={{ flexDirection: 'row-reverse', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
        <Text style={{ fontSize: 16 }}>الوضع الليلي</Text>
        <Switch value={darkMode} onValueChange={setDarkMode} />
      </View>
      <Divider style={{ marginBottom: 16 }} />
      <Button
        mode="contained"
        onPress={() => {
          logout();
          clearUser();
        }}
        style={{ marginBottom: 16 }}>
        تسجيل الخروج
      </Button>
      <Divider style={{ marginBottom: 16 }} />
      <Text style={{ fontFamily: 'Cairo_700Bold', fontSize: 18, marginBottom: 8 }}>عن التطبيق</Text>
      <Text style={{ color: '#333', marginBottom: 4 }}>{appName}</Text>
      <Text style={{ color: '#666', marginBottom: 4 }}>للدعم: {supportEmail}</Text>
      <Button mode="text" onPress={() => Linking.openURL('https://3ardelyoum.com/privacy')}>
        سياسة الخصوصية
      </Button>
    </SafeAreaView>
  );
}
