const fontSizes = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 20,
  xxl: 24,
};

const lineHeights = {
  xs: 16,
  sm: 20,
  md: 24,
  lg: 28,
  xl: 32,
  xxl: 36,
};

type TypographyType = {
  fontSizes: Record<keyof typeof fontSizes, number>;
  lineHeights: Record<keyof typeof lineHeights, number>;
};

export const typography: TypographyType = {
  fontSizes,
  lineHeights,
};
