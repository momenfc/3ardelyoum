import { doc, onSnapshot, getDoc } from 'firebase/firestore';
import { db } from '@/src/config/firebase';
import type { AppSettings } from '@/src/stores/settingsStore';

const SETTINGS_COLLECTION = 'app_settings';
const GENERAL_ID = 'general';

export function subscribeToAppSettings(callback: (settings: AppSettings) => void, onError?: (err: any) => void) {
  const ref = doc(db, SETTINGS_COLLECTION, GENERAL_ID);
  return onSnapshot(
    ref,
    snap => {
      if (snap.exists()) {
        const data = snap.data() as any;
        callback({ ...(data as AppSettings) });
      }
    },
    error => onError?.(error)
  );
}

export async function fetchAppSettings(): Promise<AppSettings | null> {
  const ref = doc(db, SETTINGS_COLLECTION, GENERAL_ID);
  const snap = await getDoc(ref);
  if (snap.exists()) return snap.data() as any as AppSettings;
  return null;
}
