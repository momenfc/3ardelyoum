import { MD3LightTheme } from 'react-native-paper';
import type { AppSettings } from '@/src/stores/settingsStore';

export const theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#FFA500',
    background: '#FFFFFF',
    surface: '#FFFFFF',
    onSurface: '#333333',
  },
};

export function createThemeFromSettings(settings: AppSettings | null | undefined) {
  const primary = settings?.primary_color || '#FFA500';
  const background = settings?.secondary_color || '#FFFFFF';
  return {
    ...MD3LightTheme,
    colors: {
      ...MD3LightTheme.colors,
      primary,
      background,
      surface: background,
      onSurface: '#333333',
    },
  };
}
