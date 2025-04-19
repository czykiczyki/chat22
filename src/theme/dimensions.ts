const spacings = {
  xs: 8,
  sm: 12,
  md: 20,
  lg: 40,
};

const radiuses = {
  sm: 4,
  md: 8,
};

const sizes = {
  input: {
    default: 48,
    multiline: 80,
  },
  button: {
    small: 40,
    default: 52,
  },
};

type DimensionsType = {
  spacings: Record<keyof typeof spacings, number>;
  radiuses: Record<keyof typeof radiuses, number>;
  sizes: Record<keyof typeof sizes, Record<string, number>>;
};

export const dimensions: DimensionsType = {
  spacings,
  radiuses,
  sizes,
};
