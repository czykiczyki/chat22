const themeColors = {
  white: '#FFFFFF',
  primaryLight: '#7E79A1',
  primary: '#5D5197',
  primaryDark: '#1E1E2F', 
  text: '#E7E7E7',
  border: '#292929',
  grey: '#707070',
  darkGrey: '#292929',
  background: '#1D1D1D',
  error: '#FF4E4E',
  alert: '#FDB62F',
  success: '#2FFD8E',
  info: '#88EEFE',
  transparent: 'transparent',
};

type ColorsType = Record<keyof typeof themeColors, string>;

export const colors: ColorsType = themeColors;
