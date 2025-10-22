import { create } from 'zustand';

export interface AppSettings {
  app_name: string;
  primary_color: string;
  secondary_color: string;
  language: 'ar' | 'en' | string;
  currency: string;
  default_category: string;
  maintenance_mode: boolean;
  support_email: string;
  version: {
    android: string;
    ios: string;
    force_update: boolean;
  };
  created_at?: any;
  updated_at?: any;
}

interface SettingsState {
  settings: AppSettings | null;
  loading: boolean;
  error: string | null;
  setSettings: (settings: AppSettings) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const DEFAULT_SETTINGS: AppSettings = {
  app_name: '3ard ElYoum',
  primary_color: '#FF6F00',
  secondary_color: '#FFFFFF',
  language: 'ar',
  currency: 'EGP',
  default_category: 'supermarket',
  maintenance_mode: false,
  support_email: 'support@3ardelyoum.com',
  version: {
    android: '1.0.0',
    ios: '1.0.0',
    force_update: false,
  },
  created_at: null,
  updated_at: null,
};

export const useSettingsStore = create<SettingsState>(set => ({
  settings: DEFAULT_SETTINGS,
  loading: false,
  error: null,
  setSettings: settings => set({ settings }),
  setLoading: loading => set({ loading }),
  setError: error => set({ error }),
}));
