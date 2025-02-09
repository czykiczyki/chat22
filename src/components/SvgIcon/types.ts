import { ViewStyle } from 'react-native';
import * as SvgIcon from './SvgIcon';

export interface SvgIconProps {
  color?: string;
  height?: number | string;
  width?: number | string;
  style?: ViewStyle;
}

export type SvgIconType = keyof Omit<
  typeof SvgIcon,
  'DEFAULT_ICON_SIZE' | 'DEFAULT_ICON_COLOR'
>;
