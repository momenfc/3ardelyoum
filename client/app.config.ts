import type { ExpoConfig } from 'expo/config';

const config: ExpoConfig = {
  name: '3ardElYoum',
  slug: '3ardElYoum',
  scheme: '3ardelyoum',
  version: '1.0.0',
  orientation: 'portrait',
  icon: './assets/images/icon.png',
  userInterfaceStyle: 'automatic',
  newArchEnabled: true,
  splash: {
    image: './assets/images/splash-icon.png',
    resizeMode: 'contain',
    backgroundColor: '#FFA500',
  },
  ios: {
    supportsTablet: true,
    bundleIdentifier: 'com.ardelyoum.app',
  },
  android: {
    package: 'com.ardelyoum.app',
    adaptiveIcon: {
      foregroundImage: './assets/images/adaptive-icon.png',
      backgroundColor: '#FFA500',
    },
    edgeToEdgeEnabled: true,
    predictiveBackGestureEnabled: false,
  },
  web: {
    bundler: 'metro',
    output: 'static',
    favicon: './assets/images/favicon.png',
  },
  plugins: [['expo-dev-client', { launchMode: 'most-recent' }], 'expo-router', 'expo-notifications'],
  experiments: {
    typedRoutes: true,
  },
  extra: {
    firebase: {
      apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
      authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
      projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
      storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
    },
    eas: {
      projectId: 'df72b0af-c694-4d04-b145-739d2c18a07c',
    },
  },

  owner: 'momenfc',

  updates: {
    url: 'https://u.expo.dev/df72b0af-c694-4d04-b145-739d2c18a07c',
  },
};

export default config;
