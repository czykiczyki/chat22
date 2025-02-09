import React, { useState } from 'react';
import {
  View,
  FlatList,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from 'react-native';
import MessageBubble from './components/MessageBubble';
import { colors, dimensions } from '../../theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useChat } from './hooks/useChat';

const Chat = () => {
  const { messages, isLoading, sendMessage } = useChat();
  const [newMessage, setNewMessage] = useState('');

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const handleSend = () => {
    if (newMessage.trim()) {
      sendMessage(newMessage);
      setNewMessage('');
    }
  };

  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={90}
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <TouchableWithoutFeedback onPress={dismissKeyboard}>
        <View style={styles.innerContainer}>
          <FlatList
            data={messages}
            renderItem={({ item }) => <MessageBubble message={item} />}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.messagesList}
          />
          {isLoading && (
            <ActivityIndicator size="large" color={colors.primary} />
          )}
          <SafeAreaView style={styles.inputContainer} edges={['bottom']}>
            <TextInput
              style={styles.input}
              placeholder="Write a message..."
              placeholderTextColor={colors.grey}
              value={newMessage}
              onChangeText={setNewMessage}
            />
            <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
              <Text style={styles.sendButtonText}>Send</Text>
            </TouchableOpacity>
          </SafeAreaView>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  innerContainer: {
    flex: 1,
  },
  messagesList: {
    padding: dimensions.spacings.md,
    flexGrow: 1,
    justifyContent: 'flex-end',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  input: {
    flex: 1,
    padding: dimensions.spacings.sm,
    fontSize: 16,
    backgroundColor: colors.darkGrey,
    borderRadius: 20,
    marginRight: 8,
    color: colors.text,
  },
  sendButton: {
    backgroundColor: colors.primary,
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  sendButtonText: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default Chat;
