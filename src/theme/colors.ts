export const colors = {
  light: {
    background: '#F8F5F2',
    text: '#2C2A29',
    textSecondary: '#6B6661',
    primary: '#4A6741',
    secondary: '#8B7355',
    surface: '#FFFFFF',
    border: '#E6E1DC',
    error: '#D32F2F',
  },
  dark: {
    background: '#1A1918',
    text: '#EAE6E1',
    textSecondary: '#9C968F',
    primary: '#7A9B71',
    secondary: '#B8A388',
    surface: '#242220',
    border: '#363432',
    error: '#EF5350',
  },
  amoled: {
    background: '#000000',
    text: '#EAE6E1',
    textSecondary: '#9C968F',
    primary: '#7A9B71',
    secondary: '#B8A388',
    surface: '#000000',
    border: '#222222',
    error: '#EF5350',
  },
};

export type ThemeColors = typeof colors.light;
