import React from 'react';
import { TouchableOpacity, View } from 'react-native';

import SvgIcon from '../SvgIcon';
import { SvgIconType } from '../SvgIcon/types';
import { colors, dimensions } from '../../theme';

export interface InputIconProps {
  onIconPress?: () => void;
  icon: SvgIconType;
  small?: boolean;
  color?: keyof typeof colors;
}

const InputIcon: React.FunctionComponent<InputIconProps> = ({
  onIconPress,
  icon,
  color,
}) => {
  const Icon = SvgIcon[icon];
  const iconEl = (
    <View
      style={{
        padding: dimensions.spacings.sm,
      }}>
      <Icon
        width={22}
        height={22}
        color={color ? colors[color] : colors.white}
      />
    </View>
  );

  return onIconPress != null ? (
    <TouchableOpacity onPress={onIconPress} activeOpacity={1}>
      {iconEl}
    </TouchableOpacity>
  ) : (
    iconEl
  );
};

export default InputIcon;
