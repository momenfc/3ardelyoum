import React, { useEffect } from 'react';
import { I18nManager } from 'react-native';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { PaperProvider } from 'react-native-paper';
import { createThemeFromSettings } from '@/src/theme';
import { useSettingsStore } from '@/src/stores/settingsStore';
import '@/src/config/i18n';
import { useFonts, Cairo_400Regular, Cairo_700Bold } from '@expo-google-fonts/cairo';
import { StatusBar } from 'expo-status-bar';
import { useNotifications } from '@/src/hooks/useNotifications';
import { useAppSettings } from '@/src/hooks/useAppSettings';
import 'react-native-reanimated';

export const unstable_settings = {
  initialRouteName: 'splash',
};

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({ Cairo_400Regular, Cairo_700Bold });

  useEffect(() => {
    if (loaded) SplashScreen.hideAsync();
  }, [loaded]);

  if (!loaded) return null;

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  useNotifications(); // Initialize push notifications
  useAppSettings(); // Load app settings from Firestore (app_settings/general)
  const settings = useSettingsStore(s => s.settings);
  const paperTheme = createThemeFromSettings(settings);

  return (
    <ThemeProvider value={DefaultTheme}>
      <PaperProvider theme={paperTheme}>
        <StatusBar style="dark" />
        <Stack screenOptions={{ headerShown: false, animation: I18nManager.isRTL ? 'slide_from_left' : 'slide_from_right' }}>
          <Stack.Screen name="splash" options={{ headerShown: false }} />
          <Stack.Screen name="login" options={{ headerShown: false }} />
          <Stack.Screen name="register" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
      </PaperProvider>
    </ThemeProvider>
  );
}
