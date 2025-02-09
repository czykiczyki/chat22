import React from 'react';
import { StyleSheet, View } from 'react-native';
import { dimensions } from '../../theme';
import Txt from '../../components/Txt';
import Button from '../../components/Button';
import { useUser } from '../../store/user/useUser';

const Chat = () => {
  const { logOutUser } = useUser();
  return (
    <View style={styles.container}>
      <Txt variant="headline" style={styles.text}>
        Chat
      </Txt>

      <Button title="Logout" onPress={logOutUser} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    marginVertical: dimensions.spacings.md,
    textAlign: 'center',
  },
});

export default Chat;
