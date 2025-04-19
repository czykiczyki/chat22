import React from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator } from 'react-native';
import { colors, dimensions, typography } from '../../../theme';

type MessageProps = {
  message: {
    id: string;
    text: string;
    sender: 'me' | 'assistant';
    files?: Array<{
      uri: string;
      type: string;
    }>;
  };
  isLoading?: boolean;
};

const MessageBubble: React.FC<MessageProps> = ({ message, isLoading }) => {
  return (
    <View
      style={[
        styles.messageContainer,
        message.sender === 'me' ? styles.myMessage : styles.otherMessage,
      ]}
    >
      {isLoading && message.sender === 'assistant' && !message.files && !message.text && (
        <ActivityIndicator size="small" color={colors.text} style={styles.loader} />
      )}
      {message.files?.map((file, index) => (
        <View key={index} style={styles.imageContainer}>
          <Image source={{ uri: file.uri }} style={styles.image} resizeMode="cover" />
        </View>
      ))}
      {message.text && <Text style={styles.messageText}>{message.text}</Text>}
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
    fontSize: typography.fontSizes.md,
    lineHeight: typography.lineHeights.md,
  },
  imageContainer: {
    marginBottom: dimensions.spacings.xs,
    borderRadius: dimensions.radiuses.sm,
    overflow: 'hidden',
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: dimensions.radiuses.sm,
  },
  loader: {
    paddingHorizontal: dimensions.spacings.sm,
  },
});

export default MessageBubble;
