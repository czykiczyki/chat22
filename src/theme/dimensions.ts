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

type DimensionsType = {
  spacings: Record<keyof typeof spacings, number>;
  radiuses: Record<keyof typeof radiuses, number>;
};

export const dimensions: DimensionsType = {
  spacings,
  radiuses,
};
