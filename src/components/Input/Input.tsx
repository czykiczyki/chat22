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
  onEnter?: () => void;
  onIconPress?: () => void;
  label?: string;
  labelStyle?: StyleProp<TextStyle>;
  readOnly?: boolean;
  icon?: SvgIconType;
  iconColor?: keyof typeof colors;
  style?: StyleProp<ViewStyle>;
  name?: string;
  width?: number;
  fullWidth?: boolean;
  small?: boolean;
  marginVertical?: number;
  marginHorizontal?: number;
  maxLength?: number;
}

const Input: React.FunctionComponent<InputProps> = ({
  autoCapitalize,
  error,
  errorMessage,
  onFocus,
  onBlur,
  onIconPress,
  label,
  labelStyle,
  editable = true,
  readOnly = false,
  icon,
  iconColor,
  style,
  onEnter,
  width,
  fullWidth,
  marginVertical = 12,
  marginHorizontal = 0,
  ...restProps
}) => {
  const [isFocused, setIsFocused] = React.useState(false);

  const setOnFocus = () => {
    setIsFocused(true);
    onFocus && onFocus();
  };

  const setOnBlur = () => {
    setIsFocused(false);
    onBlur && onBlur();
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
      ]}>
      {label && (
        <View style={styles.label}>
          <Txt style={[!!labelStyle && labelStyle]}>{label}</Txt>
        </View>
      )}

      <View
        style={[
          styles.inputContainer,
          ...(restProps.multiline ? [styles.inputContainerMultiline] : []),
          error && styles.error,
          !isFocused && !error && styles.blured,
          isFocused && !error && styles.active,
          ...(!editable ? [styles.disabled] : []),
        ]}>
        <TextInput
          allowFontScaling={false}
          autoCapitalize={autoCapitalize || 'none'}
          onFocus={setOnFocus}
          onBlur={setOnBlur}
          placeholderTextColor={colors.darkGrey}
          selectionColor={colors.primary}
          cursorColor={colors.primary}
          editable={editable && !readOnly}
          style={[
            styles.input,
            ...(restProps.multiline ? [styles.multilineInput] : []),
            ...(icon ? [{ paddingRight: 0 }] : []),
          ]}
          textAlignVertical={restProps.multiline ? 'top' : 'auto'}
          onKeyPress={event => {
            if (
              onEnter &&
              (event as unknown as { key: string })?.key === 'Enter'
            ) {
              onEnter();
            }
          }}
          keyboardAppearance="dark"
          {...restProps}
        />
        {icon && (
          <View style={styles.iconWrapper}>
            <InputIcon
              onIconPress={onIconPress}
              icon={icon}
              color={iconColor}
            />
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
    minHeight: 48,
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
    minHeight: 80,
  },
  disabled: {
    opacity: 0.2,
  },
  iconWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  paddingHorizontal: {
    paddingHorizontal: dimensions.spacings.sm,
  },
  lengthHintWrapper: {
    paddingTop: dimensions.spacings.xs,
    paddingHorizontal: dimensions.spacings.sm,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
});

export default Input;
