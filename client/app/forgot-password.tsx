import React from 'react';
import { View, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { Text, TextInput, Button, HelperText, Snackbar } from 'react-native-paper';
import { router } from 'expo-router';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '@/src/config/firebase';
import { useSettingsStore } from '@/src/stores/settingsStore';

export default function ForgotPasswordScreen() {
  const [email, setEmail] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');
  const [success, setSuccess] = React.useState('');
  const primary = useSettingsStore(s => s.settings?.primary_color || '#FFA500');

  const onReset = async () => {
    if (!email) {
      setError('يرجى إدخال البريد الإلكتروني');
      return;
    }
    try {
      setLoading(true);
      setError('');
      setSuccess('');
      await sendPasswordResetEmail(auth, email);
      setSuccess('تم إرسال رابط إعادة تعيين كلمة المرور إلى بريدك الإلكتروني.');
    } catch (err: any) {
      if (err.code === 'auth/user-not-found') {
        setError('لا يوجد مستخدم بهذا البريد الإلكتروني');
      } else if (err.code === 'auth/invalid-email') {
        setError('البريد الإلكتروني غير صالح');
      } else {
        setError('حدث خطأ. يرجى المحاولة مرة أخرى');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={{ flex: 1, backgroundColor: '#fff', padding: 16, justifyContent: 'center' }}>
        <Text variant="headlineSmall" style={{ fontFamily: 'Cairo_700Bold', textAlign: 'right', marginBottom: 16, color: '#333' }}>
          استعادة كلمة المرور
        </Text>
        <TextInput
          mode="outlined"
          label="البريد الإلكتروني"
          value={email}
          onChangeText={setEmail}
          textAlign="right"
          style={{ marginBottom: 12 }}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        {error ? (
          <HelperText type="error" visible={!!error} style={{ textAlign: 'right', fontSize: 14, marginBottom: 8 }}>
            {error}
          </HelperText>
        ) : null}
        {success ? (
          <HelperText type="info" visible={!!success} style={{ textAlign: 'right', fontSize: 14, marginBottom: 8, color: primary }}>
            {success}
          </HelperText>
        ) : null}
        <Button mode="contained" buttonColor={primary} textColor="#fff" onPress={onReset} loading={loading} disabled={loading} style={{ marginTop: 8 }}>
          إرسال رابط إعادة تعيين
        </Button>
        <Button mode="text" onPress={() => router.back()} style={{ marginTop: 16 }}>
          رجوع
        </Button>
        <Snackbar
          visible={!!error || !!success}
          onDismiss={() => {
            setError('');
            setSuccess('');
          }}
          duration={5000}
          action={{
            label: 'حسناً',
            onPress: () => {
              setError('');
              setSuccess('');
            },
          }}>
          {error || success}
        </Snackbar>
      </View>
    </TouchableWithoutFeedback>
  );
}
