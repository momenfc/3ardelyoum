import React from 'react';
import { Keyboard, TouchableWithoutFeedback, View, ScrollView } from 'react-native';
import { Button, Text, TextInput, HelperText, Snackbar } from 'react-native-paper';
import { router } from 'expo-router';
import { register } from '@/src/config/auth';
import { useSettingsStore } from '@/src/stores/settingsStore';
import { isEmail, isStrongPassword } from '@/src/utils';
import { useUserStore } from '@/src/stores/userStore';

export default function RegisterScreen() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');
  const setUser = useUserStore(state => state.setUser);
  const primary = useSettingsStore(s => s.settings?.primary_color || '#FFA500');

  const validateForm = () => {
    if (!email || !password || !confirmPassword) {
      setError('الرجاء ملء جميع الحقول');
      return false;
    }
    if (!isEmail(email)) {
      setError('البريد الإلكتروني غير صالح');
      return false;
    }
    if (!isStrongPassword(password)) {
      setError('كلمة المرور يجب أن تكون 6 أحرف على الأقل');
      return false;
    }
    if (password !== confirmPassword) {
      setError('كلمة المرور غير متطابقة');
      return false;
    }
    setError('');
    return true;
  };

  const onRegister = async () => {
    if (!validateForm()) return;

    try {
      setLoading(true);
      setError('');
      const userCredential = await register(email, password);
      console.log('🚀 ~ onRegister ~ user:', userCredential);
      setUser(userCredential.uid, userCredential.email || email);
      router.replace('/(tabs)');
    } catch (err: any) {
      console.error('Registration error:', err);
      if (err.code === 'auth/email-already-in-use') {
        setError('البريد الإلكتروني مستخدم بالفعل');
      } else if (err.code === 'auth/weak-password') {
        setError('كلمة المرور ضعيفة جداً');
      } else if (err.code === 'auth/invalid-email') {
        setError('البريد الإلكتروني غير صالح');
      } else if (err.code === 'auth/operation-not-allowed') {
        setError('التسجيل غير مفعل حالياً');
      } else {
        setError('حدث خطأ في التسجيل، يرجى المحاولة مرة أخرى');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={{ flex: 1, backgroundColor: '#fff', padding: 16, justifyContent: 'center' }}>
          <Text variant="headlineSmall" style={{ fontFamily: 'Cairo_700Bold', textAlign: 'right', marginBottom: 16, color: '#333' }}>
            إنشاء حساب جديد
          </Text>

          <TextInput
            mode="outlined"
            label="البريد الإلكتروني"
            value={email}
            onChangeText={setEmail}
            textAlign="right"
            keyboardType="email-address"
            autoCapitalize="none"
            style={{ marginBottom: 12 }}
          />

          <TextInput
            mode="outlined"
            label="كلمة المرور"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            textAlign="right"
            style={{ marginBottom: 12 }}
          />

          <TextInput
            mode="outlined"
            label="تأكيد كلمة المرور"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
            textAlign="right"
            style={{ marginBottom: 8 }}
          />

          {error ? (
            <HelperText type="error" visible={!!error} style={{ textAlign: 'right', fontSize: 14 }}>
              {error}
            </HelperText>
          ) : null}

          <Button mode="contained" buttonColor={primary} textColor="#fff" onPress={onRegister} loading={loading} disabled={loading} style={{ marginTop: 16 }}>
            تسجيل
          </Button>

          <View style={{ flexDirection: 'row-reverse', justifyContent: 'center', marginTop: 16, gap: 8 }}>
            <Text style={{ textAlign: 'center', color: '#666' }}>لديك حساب بالفعل؟</Text>
            <Text style={{ textAlign: 'center', color: primary, fontWeight: 'bold' }} onPress={() => router.back()}>
              تسجيل الدخول
            </Text>
          </View>

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
      </ScrollView>
    </TouchableWithoutFeedback>
  );
}
