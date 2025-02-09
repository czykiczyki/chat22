import React, { useState } from 'react';
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

export interface ButtonComponentProps extends PressableProps {
  containerStyle?: StyleProp<ViewStyle>;
  disabled?: boolean;
  loading?: boolean;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
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

const Button: React.FunctionComponent<ButtonComponentProps> = ({
  containerStyle,
  disabled,
  loading,
  onPress,
  style,
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
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isPressed, setIsPressed] = useState<boolean>(false);

  const shouldPress = () => {
    if (loading || disabled) {
      return;
    }
    onPress();
  };
  const onPressIn = () => {
    if (!disabled && !loading && !isPressed) {
      setIsPressed(true);
    }
  };
  const onPressOut = () => {
    setIsPressed(false);
  };
  const onHoverIn = () => {
    if (!disabled && !loading && !isHovered) {
      setIsHovered(true);
    }
  };
  const onHoverOut = () => {
    setIsHovered(false);
  };

  const Icon = icon ? SvgIcon[icon] : undefined;

  return (
    <Pressable
      accessibilityRole="button"
      disabled={loading || disabled}
      onPress={shouldPress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      onHoverIn={onHoverIn}
      onHoverOut={onHoverOut}
      style={[
        styles.container,
        { width: width ? width : fullWidth ? '100%' : 'auto' },
        secondary
          ? styles.secondary
          : danger
          ? styles.danger
          : dangerSecondary
          ? styles.dangerSecondary
          : styles.primary,
        small ? styles.small : styles.big,
        disabled
          ? secondary
            ? styles.secondaryDisabled
            : styles.primaryDisabled
          : {},
        isHovered ? styles.hovered : {},
        isPressed ? styles.pressed : {},
        { marginVertical, marginHorizontal },
        containerStyle,
      ]}
      {...restProps}>
      <View style={styles.buttonContent}>
        {loading && (
          <ActivityIndicator
            size="small"
            color={secondary ? colors.primary : colors.white}
            style={styles.indicator}
          />
        )}
        {Icon && iconLeft && iconColor && (
          <View style={{ marginRight: 4 }}>
            <Icon color={iconColor ? colors[iconColor] : colors.darkGrey} />
          </View>
        )}
        <Txt
          numberOfLines={1}
          style={[
            {
              color:
                (titleColor && colors[titleColor]) ||
                (danger
                  ? colors.error
                  : secondary
                  ? disabled
                    ? colors.grey
                    : colors.white
                  : colors.white),
            },
          ]}>
          {title}
        </Txt>
        <View>
          {Icon && !iconLeft && !iconColor && (
            <Icon color={secondary ? colors.primary : colors.white} />
          )}
        </View>
        <View>
          {Icon && !iconLeft && iconColor && <Icon color={colors[iconColor]} />}
        </View>
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
  tertiary: {
    backgroundColor: colors.transparent,
    color: colors.primary,
  },
  danger: {
    backgroundColor: colors.primaryDark,
    color: colors.error,
  },
  dangerSecondary: {
    backgroundColor: colors.error,
    color: colors.primaryDark,
  },
  primaryDisabled: {
    opacity: 0.25,
  },
  secondaryDisabled: {
    borderColor: colors.grey,
    borderWidth: 1.5,
    backgroundColor: colors.transparent,
  },
  hovered: {
    opacity: 0.7,
  },
  pressed: {
    opacity: 0.9,
  },
  small: {
    borderRadius: dimensions.radiuses.md,
    paddingHorizontal: 24,
    height: 40,
  },
  big: {
    borderRadius: dimensions.radiuses.md,
    paddingHorizontal: 32,
    height: 52,
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
    marginRight: 13,
  },
});

export default Button;
