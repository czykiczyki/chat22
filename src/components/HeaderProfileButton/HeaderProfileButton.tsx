import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { dimensions, colors } from '../../theme';
import { useNavigation } from '@react-navigation/native';
import { NavigationProps } from '../../types/navigation';

const HeaderProfileButton: React.FC = () => {
  const { navigate } = useNavigation<NavigationProps>();

  return (
    <TouchableOpacity
      style={styles.headerButton}
      onPress={() => {
        navigate('Profile');
      }}>
      <Text style={styles.headerButtonText}>Profile</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  headerButton: {
    marginRight: dimensions.spacings.sm,
    paddingVertical: dimensions.spacings.xs,
    paddingHorizontal: dimensions.spacings.sm,
    borderRadius: dimensions.radiuses.sm,
    backgroundColor: colors.primaryLight,
  },
  headerButtonText: {
    color: colors.text,
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default HeaderProfileButton;
