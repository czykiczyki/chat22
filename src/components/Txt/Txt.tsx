import React from 'react';
import { Text, TextProps } from 'react-native';
import { colors, typography } from '../../theme';

const fontSizes = {
  small: typography.fontSizes.xs,
  default: typography.fontSizes.md,
  headline: typography.fontSizes.xxl,
};

interface TxtProps extends TextProps {
  variant?: keyof typeof fontSizes;
  color?: keyof typeof colors;
  lowercase?: boolean;
  uppercase?: boolean;
}

const Txt: React.FC<TxtProps> = ({
  variant = 'default',
  color = 'text',
  children,
  lowercase,
  uppercase,
  style,
  ...rest
}) => {
  if (lowercase && typeof children === 'string') {
    children = children.toLowerCase();
  }

  if (uppercase && typeof children === 'string') {
    children = children.toUpperCase();
  }

  return (
    <Text style={[{ color: colors[color], fontSize: fontSizes[variant] }, style]} {...rest}>
      {children}
    </Text>
  );
};

export default Txt;
