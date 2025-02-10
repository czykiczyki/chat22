import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { colors, dimensions } from '../../theme';
import { useUser } from '../../store/user/useUser';
import Txt from '../../components/Txt';
import Button from '../../components/Button';
import { SafeAreaView } from 'react-native-safe-area-context';

const Profile = () => {
  const { user, logOutUser } = useUser();

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <Image source={{ uri: user?.photoUrl }} style={styles.profileImage} />
        <Txt style={styles.userName}>{user?.name}</Txt>
      </View>
      <SafeAreaView style={styles.logoutContainer}>
        <Button danger title="Logout" onPress={logOutUser} />
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  profileContainer: {
    alignItems: 'center',
    padding: dimensions.spacings.md,
    backgroundColor: colors.darkGrey,
    borderRadius: 12,
    width: '90%',
    maxWidth: 400,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: dimensions.spacings.md,
    backgroundColor: colors.grey,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
  },
  logoutContainer: {
    marginTop: dimensions.spacings.lg,
  },
});

export default Profile;
