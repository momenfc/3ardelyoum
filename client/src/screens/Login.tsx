import React from 'react';
import { Keyboard, TouchableWithoutFeedback, View } from 'react-native';
import { Button, Text, TextInput, HelperText, Snackbar } from 'react-native-paper';
import { router } from 'expo-router';
import { login } from '@/src/config/auth';
import { useSettingsStore } from '@/src/stores/settingsStore';
import { useUserStore } from '@/src/stores/userStore';

export default function LoginScreen() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');
  const setUser = useUserStore(state => state.setUser);
  const primary = useSettingsStore(s => s.settings?.primary_color || '#FFA500');

  const onLogin = async () => {
    if (!email || !password) {
      setError('الرجاء إدخال البريد الإلكتروني وكلمة المرور');
      return;
    }
    try {
      setLoading(true);
      setError('');
      const userCredential = await login(email, password);
      console.log('🚀 ~ onLogin ~ user:', userCredential);
      setUser(userCredential.uid, userCredential.email || email);
      router.replace('/(tabs)');
    } catch (err: any) {
      console.log('🚀 ~ onLogin ~ error:', err);
      if (err.code === 'auth/user-not-found') {
        setError('لا يوجد مستخدم بهذا البريد الإلكتروني');
      } else if (err.code === 'auth/wrong-password') {
        setError('كلمة المرور غير صحيحة');
      } else if (err.code === 'auth/invalid-email') {
        setError('البريد الإلكتروني غير صالح');
      } else if (err.code === 'auth/invalid-credential') {
        setError('البريد الإلكتروني أو كلمة المرور غير صحيحة');
      } else if (err.code === 'auth/too-many-requests') {
        setError('عدد كبير جداً من المحاولات. يرجى المحاولة لاحقاً');
      } else {
        setError('حدث خطأ في تسجيل الدخول. يرجى المحاولة مرة أخرى');
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={{ flex: 1, backgroundColor: '#fff', padding: 16, justifyContent: 'center' }}>
        <Text variant="headlineSmall" style={{ fontFamily: 'Cairo_700Bold', textAlign: 'right', marginBottom: 16, color: '#333' }}>
          تسجيل الدخول
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
        <TextInput
          mode="outlined"
          label="كلمة المرور"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          textAlign="right"
          style={{ marginBottom: 8 }}
        />

        {error ? (
          <HelperText type="error" visible={!!error} style={{ textAlign: 'right', fontSize: 14, marginBottom: 8 }}>
            {error}
          </HelperText>
        ) : null}

        <Button mode="contained" buttonColor={primary} textColor="#fff" onPress={onLogin} loading={loading} disabled={loading} style={{ marginTop: 8 }}>
          دخول
        </Button>

        <View style={{ flexDirection: 'row-reverse', justifyContent: 'center', marginTop: 16, gap: 8 }}>
          <Text style={{ textAlign: 'center', color: '#666' }}>ليس لديك حساب؟</Text>
          <Text style={{ textAlign: 'center', color: primary, fontWeight: 'bold' }} onPress={() => router.push('/register')}>
            إنشاء حساب
          </Text>
        </View>

        <Text
          style={{ textAlign: 'center', color: primary, fontWeight: 'bold', marginTop: 12, textDecorationLine: 'underline' }}
          onPress={() => router.push('/forgot-password')}>
          هل نسيت كلمة المرور؟
        </Text>

        <Snackbar
          visible={!!error}
          onDismiss={() => setError('')}
          duration={5000}
          action={{
            label: 'حسناً',
            onPress: () => setError(''),
          }}>
          {error}
        </Snackbar>
      </View>
    </TouchableWithoutFeedback>
  );
}
