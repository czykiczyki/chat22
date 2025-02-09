import React from 'react';
import { StyleSheet, View } from 'react-native';
import { dimensions } from '../../theme';
import Txt from '../../components/Txt';

const Chat = () => {
  return (
    <View style={styles.container}>
      <Txt variant="headline" style={styles.text}>
        Chat
      </Txt>
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
