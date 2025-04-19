import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  StyleProp,
  ViewStyle,
  View,
  Pressable,
  PressableProps,
} from 'react-native';
import SvgIcon from '../SvgIcon';
import Txt from '../Txt';
import { SvgIconType } from '../SvgIcon/types';
import { colors, dimensions } from '../../theme';

interface Props extends PressableProps {
  containerStyle?: StyleProp<ViewStyle>;
  disabled?: boolean;
  loading?: boolean;
  onPress: () => void;
  title?: string;
  titleColor?: keyof typeof colors;
  icon?: SvgIconType;
  iconColor?: keyof typeof colors;
  iconLeft?: boolean;
  width?: number;
  secondary?: boolean;
  danger?: boolean;
  dangerSecondary?: boolean;
  small?: boolean;
  fullWidth?: boolean;
  marginVertical?: number;
  marginHorizontal?: number;
}

const Button: React.FC<Props> = ({
  containerStyle,
  disabled,
  loading,
  onPress,
  title,
  titleColor,
  icon,
  iconColor,
  iconLeft,
  secondary = false,
  danger = false,
  dangerSecondary = false,
  small = false,
  width,
  fullWidth,
  marginVertical = 12,
  marginHorizontal = 0,
  ...restProps
}) => {
  const Icon = icon ? SvgIcon[icon] : undefined;
  const isDisabled = loading || disabled;

  const getButtonStyle = () => {
    if (isDisabled) {
      return secondary ? styles.secondaryDisabled : styles.primaryDisabled;
    }
    if (danger) {
      return styles.danger;
    }
    if (dangerSecondary) {
      return styles.dangerSecondary;
    }
    if (secondary) {
      return styles.secondary;
    }
    return styles.primary;
  };

  const getTextColor = () => {
    if (titleColor) {
      return colors[titleColor];
    }
    if (danger) {
      return colors.error;
    }
    if (secondary) {
      return isDisabled ? colors.grey : colors.white;
    }
    return colors.white;
  };

  const getIconColor = () => {
    if (iconColor) {
      return colors[iconColor];
    }
    if (secondary) {
      return isDisabled ? colors.grey : colors.primary;
    }
    return colors.white;
  };

  return (
    <Pressable
      accessibilityRole="button"
      disabled={isDisabled}
      onPress={onPress}
      style={[
        styles.container,
        { width: width ? width : fullWidth ? '100%' : 'auto' },
        getButtonStyle(),
        small ? styles.small : styles.big,
        { marginVertical, marginHorizontal },
        containerStyle,
      ]}
      {...restProps}
    >
      <View style={styles.buttonContent}>
        {loading && (
          <ActivityIndicator size="small" color={getIconColor()} style={styles.indicator} />
        )}
        {Icon && iconLeft && (
          <View style={styles.icon}>
            <Icon color={getIconColor()} />
          </View>
        )}
        {title && (
          <Txt numberOfLines={1} style={{ color: getTextColor() }}>
            {title}
          </Txt>
        )}
        {Icon && !iconLeft && <Icon color={getIconColor()} />}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  primary: {
    backgroundColor: colors.primary,
  },
  secondary: {
    backgroundColor: colors.grey,
  },
  danger: {
    backgroundColor: colors.primaryDark,
  },
  dangerSecondary: {
    backgroundColor: colors.error,
  },
  primaryDisabled: {
    opacity: 0.25,
  },
  secondaryDisabled: {
    borderColor: colors.grey,
    borderWidth: 1.5,
    backgroundColor: colors.transparent,
  },
  small: {
    borderRadius: dimensions.radiuses.md,
    paddingHorizontal: dimensions.spacings.md,
    height: dimensions.sizes.button.small,
  },
  big: {
    borderRadius: dimensions.radiuses.md,
    paddingHorizontal: dimensions.spacings.lg,
    height: dimensions.sizes.button.default,
  },
  buttonContent: {
    display: 'flex',
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  indicator: {
    marginRight: dimensions.spacings.sm,
  },
  icon: { marginRight: 4 },
});

export default Button;
