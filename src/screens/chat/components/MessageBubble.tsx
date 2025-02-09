import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, dimensions } from '../../../theme';

type MessageProps = {
  message: {
    id: string;
    text: string;
    sender: 'me' | 'other';
  };
};

const MessageBubble: React.FC<MessageProps> = ({ message }) => {
  return (
    <View
      style={[
        styles.messageContainer,
        message.sender === 'me' ? styles.myMessage : styles.otherMessage,
      ]}
    >
      <Text style={styles.messageText}>{message.text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  messageContainer: {
    padding: dimensions.spacings.sm,
    marginVertical: dimensions.spacings.xs,
    borderRadius: dimensions.radiuses.md,
    maxWidth: '90%',
  },
  myMessage: {
    backgroundColor: colors.primary,
    alignSelf: 'flex-end',
    borderBottomRightRadius: 0,
  },
  otherMessage: {
    backgroundColor: colors.primaryLight,
    alignSelf: 'flex-start',
    borderBottomLeftRadius: 0,
  },
  messageText: {
    color: colors.text,
    fontSize: 16,
  },
});

export default MessageBubble;
