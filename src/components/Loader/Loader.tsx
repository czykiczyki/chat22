import React from 'react';
import {
  View,
  StyleSheet,
  StyleProp,
  ViewStyle,
  ActivityIndicator,
} from 'react-native';
import { colors } from '../../theme/colors';
import { dimensions } from '../../theme/dimensions';

interface Props {
  style?: StyleProp<ViewStyle>;
  size?: number | 'large' | 'small';
  center?: boolean;
}

const Loader: React.FC<Props> = ({ style, size = 'small', center }) => {
  return (
    <View style={[styles.container, style, center && { alignItems: 'center' }]}>
      <ActivityIndicator size={size} color={colors.white} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
    backgroundColor: colors.background,
    marginVertical: dimensions.spacings.md,
  },
});

export default Loader;
