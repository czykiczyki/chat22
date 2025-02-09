import React from 'react';
import Svg, { Path, Rect } from 'react-native-svg';
import { colors } from '../../theme';
import { SvgIconProps as Props } from './types';

export const DEFAULT_ICON_SIZE = 24;
export const DEFAULT_ICON_COLOR = colors.white;

export const DoneCheck = ({
  width = DEFAULT_ICON_SIZE,
  height = DEFAULT_ICON_SIZE,
  color = DEFAULT_ICON_COLOR,
  ...rest
}: Props) => (
  <Svg width={width} height={height} fill="none" viewBox="0 0 24 24" {...rest}>
    <Path
      d="M20 6.5L9 17.5L4 12.5"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const Information = ({
  width = DEFAULT_ICON_SIZE,
  height = DEFAULT_ICON_SIZE,
  color = DEFAULT_ICON_COLOR,
  ...rest
}: Props) => (
  <Svg width={width} height={height} fill="none" viewBox="0 0 24 24" {...rest}>
    <Path
      d="M12 12V17"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M11.999 8C11.861 8 11.749 8.112 11.75 8.25C11.75 8.388 11.862 8.5 12 8.5C12.138 8.5 12.25 8.388 12.25 8.25C12.25 8.112 12.138 8 11.999 8"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const Close = ({
  width = DEFAULT_ICON_SIZE,
  height = DEFAULT_ICON_SIZE,
  color = DEFAULT_ICON_COLOR,
  ...rest
}: Props) => (
  <Svg width={width} height={height} fill="none" viewBox="0 0 24 24" {...rest}>
    <Path
      d="M8 8L16 16"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M16 8L8 16"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
