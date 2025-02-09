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
} from 'react-native';
import MessageBubble from './components/MessageBubble';
import { colors, dimensions } from '../../theme';
import { SafeAreaView } from 'react-native-safe-area-context';

type Message = {
  id: string;
  text: string;
  sender: 'me' | 'other';
};

const Chat = () => {
  // TODO replace mock messages with real messages
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', text: 'Hello! How are you?', sender: 'other' },
    { id: '2', text: 'I am fine, thanks! And you?', sender: 'me' },
    { id: '3', text: 'I am doing great!', sender: 'other' },
  ]);

  const [newMessage, setNewMessage] = useState('');

  const sendMessage = () => {
    if (newMessage.trim()) {
      const newMsg: Message = {
        id: String(messages.length + 1),
        text: newMessage,
        sender: 'me',
      };
      setMessages([...messages, newMsg]);
      setNewMessage('');
    }
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
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
          <SafeAreaView style={styles.inputContainer} edges={['bottom']}>
            <TextInput
              style={styles.input}
              placeholder="Write a message..."
              placeholderTextColor={colors.grey}
              value={newMessage}
              onChangeText={setNewMessage}
            />
            <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
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
