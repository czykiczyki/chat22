import React from 'react';
import {
  StyleProp,
  StyleSheet,
  TextInput,
  TextInputProps,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import { colors, dimensions } from '../../theme';
import Txt from '../Txt';
import InputIcon from './InputIcon';
import { SvgIconType } from '../SvgIcon/types';

export interface InputProps extends TextInputProps {
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  error?: boolean;
  errorMessage?: string;
  onBlur?: () => void;
  onFocus?: () => void;
  onIconPress?: () => void;
  label?: string;
  labelStyle?: StyleProp<TextStyle>;
  readOnly?: boolean;
  icon?: SvgIconType;
  iconColor?: keyof typeof colors;
  style?: StyleProp<ViewStyle>;
  width?: number;
  fullWidth?: boolean;
  small?: boolean;
  marginVertical?: number;
  marginHorizontal?: number;
}

const Input: React.FC<InputProps> = ({
  autoCapitalize,
  error,
  errorMessage,
  onFocus,
  onBlur,
  onIconPress,
  label,
  labelStyle,
  readOnly = false,
  icon,
  iconColor,
  style,
  width,
  fullWidth,
  marginVertical = 12,
  marginHorizontal = 0,
  ...restProps
}) => {
  const [isFocused, setIsFocused] = React.useState(false);

  const getInputContainerStyle = () => {
    if (error) {
      return styles.error;
    }
    if (isFocused) {
      return styles.active;
    }
    return styles.blured;
  };

  return (
    <View
      style={[
        {
          marginVertical,
          marginHorizontal,
          width: width ? width : fullWidth ? '100%' : 'auto',
        },
        style,
      ]}
    >
      {label && (
        <View style={styles.label}>
          <Txt style={labelStyle}>{label}</Txt>
        </View>
      )}

      <View
        style={[
          styles.inputContainer,
          restProps.multiline && styles.inputContainerMultiline,
          getInputContainerStyle(),
          readOnly && styles.disabled,
        ]}
      >
        <TextInput
          allowFontScaling={false}
          autoCapitalize={autoCapitalize || 'none'}
          onFocus={() => {
            setIsFocused(true);
            onFocus?.();
          }}
          onBlur={() => {
            setIsFocused(false);
            onBlur?.();
          }}
          placeholderTextColor={colors.darkGrey}
          selectionColor={colors.primary}
          cursorColor={colors.primary}
          editable={!readOnly}
          style={[styles.input, restProps.multiline && styles.multilineInput, icon && styles.icon]}
          textAlignVertical={restProps.multiline ? 'top' : 'auto'}
          keyboardAppearance="dark"
          {...restProps}
        />
        {icon && (
          <View style={styles.iconWrapper}>
            <InputIcon onIconPress={onIconPress} icon={icon} color={iconColor} />
          </View>
        )}
      </View>

      {error && errorMessage && (
        <View style={styles.errorMessage}>
          <Txt variant="small" color="error">
            {errorMessage}
          </Txt>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    overflow: 'hidden',
    flexGrow: 1,
    borderRadius: dimensions.radiuses.md,
    borderColor: colors.darkGrey,
    backgroundColor: colors.darkGrey,
    display: 'flex',
    width: '100%',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'stretch',
    fontWeight: '400',
  },
  active: {
    borderColor: colors.primary,
    borderWidth: 1,
  },
  blured: {
    borderWidth: 1,
    borderColor: colors.darkGrey,
  },
  error: {
    borderColor: colors.error,
    borderWidth: 1,
  },
  input: {
    color: colors.white,
    flex: 1,
    minHeight: dimensions.sizes.input.default,
    paddingHorizontal: dimensions.spacings.sm,
  },
  label: {
    marginBottom: dimensions.spacings.xs,
  },
  errorMessage: {
    marginTop: dimensions.spacings.xs,
  },
  inputContainerMultiline: {
    paddingVertical: dimensions.spacings.sm,
  },
  multilineInput: {
    minHeight: dimensions.sizes.input.multiline,
  },
  disabled: {
    opacity: 0.2,
  },
  iconWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    paddingRight: 0,
  },
});

export default Input;
