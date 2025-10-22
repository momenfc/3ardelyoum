import Constants from 'expo-constants';
import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

export type FirebaseConfig = {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
};

function assertEnv(cfg: Partial<FirebaseConfig>): asserts cfg is FirebaseConfig {
  const required: (keyof FirebaseConfig)[] = ['apiKey', 'authDomain', 'projectId', 'storageBucket', 'messagingSenderId', 'appId'];
  const missing = required.filter(k => !cfg[k]);
  if (missing.length) {
    throw new Error(`Missing Firebase config keys: ${missing.join(', ')}`);
  }
}

export function getFirebaseApp(): FirebaseApp {
  const extra = (Constants.expoConfig?.extra ?? {}) as any;
  const cfg = extra.firebase as Partial<FirebaseConfig> | undefined;
  if (!cfg) throw new Error('Firebase config not found in app config (expo.extra.firebase)');
  assertEnv(cfg);
  const app = getApps()[0] ?? initializeApp(cfg);
  return app;
}

export const auth = getAuth(getFirebaseApp());
export const db = getFirestore(getFirebaseApp());
