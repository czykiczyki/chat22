import React, { useMemo } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import RNToast, { BaseToastProps } from 'react-native-toast-message';
import { View, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { colors, dimensions } from '../../theme';
import Txt from '../Txt';
import SvgIcon from '../SvgIcon';

const toastTheme = {
  success: {
    icon: SvgIcon.DoneCheck,
    color: colors.success,
    size: 15,
    iconStyles: undefined,
  },
  error: {
    icon: SvgIcon.Close,
    color: colors.error,
    size: 19,
    iconStyles: undefined,
  },
  warning: {
    icon: SvgIcon.Information,
    color: colors.alert,
    size: 22,
    iconStyles: {
      transform: [{ rotate: `180deg` }],
    },
  },
  info: {
    icon: SvgIcon.Information,
    color: colors.info,
    size: 22,
    iconStyles: undefined,
  },
};
export type ToastType = keyof typeof toastTheme;

const BaseToast: React.FC<{
  title?: string;
  serverErrMessage?: string;
  type: ToastType;
}> = props => {
  const { icon: Icon, color, size, iconStyles } = toastTheme[props.type];

  return (
    <View style={[styles.container, { borderColor: color }]}>
      <View style={[styles.iconContainer, { borderColor: color }]}>
        <Icon style={iconStyles} color={color} width={size} height={size} />
      </View>
      <View style={styles.contentContainer}>
        <View>
          <Txt variant="default">{props.title}</Txt>
          {props.serverErrMessage && (
            <Txt
              variant="small"
              style={styles.serverErrMessage}
              numberOfLines={2}>
              ERROR: {props.serverErrMessage.toUpperCase()}
            </Txt>
          )}
        </View>
      </View>
    </View>
  );
};

export const toastConfig = {
  success: (props: BaseToastProps) => (
    <BaseToast
      title={props.text1}
      serverErrMessage={props.text2}
      type="success"
    />
  ),
  error: (props: BaseToastProps) => (
    <BaseToast
      title={props.text1}
      serverErrMessage={props.text2}
      type="error"
    />
  ),
  info: (props: BaseToastProps) => (
    <BaseToast title={props.text1} serverErrMessage={props.text2} type="info" />
  ),
  warning: (props: BaseToastProps) => (
    <BaseToast
      title={props.text1}
      serverErrMessage={props.text2}
      type="warning"
    />
  ),
};

export const toastOffsets = {
  topOffset: 12,
  bottomOffset: 0,
  keyboardOffset: 30,
};

const Toast = () => {
  const insets = useSafeAreaInsets();

  const offsets = useMemo(() => {
    if (insets.top > 0 || insets.bottom > 0) {
      const { topOffset, bottomOffset, keyboardOffset } = toastOffsets;
      return {
        topOffset: insets.top + topOffset,
        bottomOffset: insets.bottom + bottomOffset,
        keyboardOffset,
      };
    }

    return toastOffsets;
  }, [insets]);

  return <RNToast config={toastConfig} position="top" {...offsets} />;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    minHeight: 66,
    width: wp('100%') - dimensions.spacings.md,
    borderRadius: dimensions.radiuses.md,
    backgroundColor: colors.darkGrey,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: dimensions.radiuses.md,
    borderLeftWidth: 8,
    padding: dimensions.spacings.sm,
    alignItems: 'center',
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: dimensions.spacings.sm,
    width: 22,
    height: 22,
    borderColor: colors.white,
    borderWidth: 1,
    borderRadius: 50,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  serverErrMessage: {
    paddingTop: 2,
  },
});

export default Toast;