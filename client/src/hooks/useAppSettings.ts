import { useEffect } from 'react';
import { subscribeToAppSettings, fetchAppSettings } from '@/src/services/appSettingsService';
import { DEFAULT_SETTINGS, useSettingsStore } from '@/src/stores/settingsStore';

/**
 * Subscribe to Firestore app_settings/general and keep Zustand in sync.
 * Falls back to DEFAULT_SETTINGS until the first snapshot arrives.
 */
export function useAppSettings() {
  const setSettings = useSettingsStore(s => s.setSettings);
  const setLoading = useSettingsStore(s => s.setLoading);
  const setError = useSettingsStore(s => s.setError);

  useEffect(() => {
    let initialized = false;
    setLoading(true);

    const unsub = subscribeToAppSettings(
      settings => {
        initialized = true;
        setSettings(settings);
        setLoading(false);
      },
      err => {
        setError(err?.message || 'Failed to load settings');
        setLoading(false);
      }
    );

    // Optional: prefetch once for faster first paint
    fetchAppSettings()
      .then(s => {
        if (s && !initialized) setSettings(s);
      })
      .catch(() => {})
      .finally(() => {
        if (!initialized) setLoading(false);
      });

    return () => unsub();
  }, [setSettings, setLoading, setError]);
}
