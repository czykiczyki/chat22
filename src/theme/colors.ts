const themeColors = {
  white: '#FFFFFF',
  text: '#E7E7E7',
  border: '#292929',
  darkGrey: '#707070',
  background: '#1D1D1D',
  error: '#FF4E4E',
  alert: '#FDB62F',
  success: '#2FFD8E',
  info: '#88EEFE',
  transparent: 'transparent',
};

type ColorsType = Record<keyof typeof themeColors, string>;

export const colors: ColorsType = themeColors;
