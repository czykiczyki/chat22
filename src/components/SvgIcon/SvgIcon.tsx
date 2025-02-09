import React from 'react';
import Svg, { Path, Rect } from 'react-native-svg';
import { colors } from '../../theme';
import { SvgIconProps as Props } from './types';

export const DEFAULT_ICON_SIZE = 24;
export const DEFAULT_ICON_COLOR = colors.white;


export const Eye = ({
  width = DEFAULT_ICON_SIZE,
  height = DEFAULT_ICON_SIZE,
  color = DEFAULT_ICON_COLOR,
  ...rest
}: Props) => (
  <Svg width={width} height={height} fill="none" viewBox="0 0 24 24" {...rest}>
    <Path
      d="M14.122 9.87975C15.293 11.0508 15.293 12.9518 14.122 14.1248C12.951 15.2958 11.05 15.2958 9.87703 14.1248C8.70603 12.9538 8.70603 11.0527 9.87703 9.87975C11.05 8.70675 12.95 8.70675 14.122 9.87975"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M3 12C3 11.341 3.152 10.689 3.446 10.088V10.088C4.961 6.991 8.309 5 12 5C15.691 5 19.039 6.991 20.554 10.088V10.088C20.848 10.689 21 11.341 21 12C21 12.659 20.848 13.311 20.554 13.912V13.912C19.039 17.009 15.691 19 12 19C8.309 19 4.961 17.009 3.446 13.912V13.912C3.152 13.311 3 12.659 3 12Z"
      fillRule="evenodd"
      clipRule="evenodd"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const EyeClosed = ({
  width = DEFAULT_ICON_SIZE,
  height = DEFAULT_ICON_SIZE,
  color = DEFAULT_ICON_COLOR,
  ...rest
}: Props) => (
  <Svg width={width} height={height} fill="none" viewBox="0 0 24 24" {...rest}>
    <Path
      d="M12.0001 19.0004C11.1581 19.0004 10.3151 18.8224 9.49609 18.5054"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M20.882 12.4678C18.99 15.9668 15.495 18.9998 12 18.9998"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M19.0791 8.9209C19.7701 9.7299 20.3841 10.6119 20.8821 11.5329C21.0391 11.8239 21.0391 12.1769 20.8821 12.4679"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M5 19L19 5"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M9.77309 14.2271C8.54309 12.9971 8.54309 11.0021 9.77309 9.77211C11.0031 8.54211 12.9981 8.54211 14.2281 9.77211"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M17.0442 6.956C15.4972 5.759 13.7482 5 12.0002 5C8.50524 5 5.01024 8.033 3.11824 11.533C2.96124 11.824 2.96124 12.177 3.11824 12.468C4.06424 14.217 5.41024 15.849 6.95624 17.045"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

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
