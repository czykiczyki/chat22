import React from 'react';
import { View, StyleSheet } from 'react-native';
import { colors, dimensions } from '../../theme';
import { useUser } from '../../store/user/useUser';
import Txt from '../../components/Txt';

const Profile = () => {
  const { user } = useUser();

  return (
    <View style={styles.container}>
      <View style={styles.spacings}>
        <Txt>{user?.name}</Txt>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  spacings: {
    padding: dimensions.spacings.md,
  },
});

export default Profile;
