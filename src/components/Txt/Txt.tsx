import React from 'react';
import { Text, TextProps } from 'react-native';
import { colors } from '../../theme';

const fontSizes = {
  small: 10,
  default: 16,
  headline: 32,
};

interface TxtProps extends TextProps {
  variant?: keyof typeof fontSizes;
  color?: keyof typeof colors;
  lowercase?: boolean;
  uppercase?: boolean;
}

const Txt: React.FC<TxtProps> = ({
  variant = 'default',
  color = colors.text,
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
    <Text style={[{ color, fontSize: fontSizes[variant] }, style]} {...rest}>
      {children}
    </Text>
  );
};

export default Txt;
