import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import { useChat } from './hooks/useChat';
import MessageBubble from './components/MessageBubble';
import FileBox from './components/FileBox';
import { colors, dimensions } from '../../theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import { pickDocument } from './utils/filePicker';
import { showToast } from '../../utils/showToast';

type UploadedFile = {
  uri: string;
  name: string;
  type: string;
  size: number;
};

const Chat = () => {
  const { messages, isLoading, sendMessage } = useChat();
  const [newMessage, setNewMessage] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const handleFileUpload = async () => {
    try {
      const file = await pickDocument();

      if (file && file.size && file.size > 10 * 1024 * 1024) {
        showToast('error', 'File is too large. Maximum allowed size is 10MB.');

        return;
      }

      if (file) {
        const uploadedFile: UploadedFile = {
          uri: file.uri,
          name: file.name || 'Unnamed file',
          type: file.type || 'application/octet-stream',
          size: file.size || 0,
        };

        setUploadedFiles(prev => [...prev, uploadedFile]);
      }
    } catch (error) {
      showToast('error', 'Error picking file.');
      if (__DEV__) {
        console.error('Error picking file:', error);
      }
    }
  };

  const removeFile = (uri: string) => {
    setUploadedFiles(prev => prev.filter(file => file.uri !== uri));
  };

  const handleSend = () => {
    if (newMessage.trim() || uploadedFiles.length > 0) {
      sendMessage(newMessage, uploadedFiles);
      setNewMessage('');
      setUploadedFiles([]);
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

          <SafeAreaView style={styles.bottom} edges={['bottom']}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.filesPreviewContainer}>
              {uploadedFiles.map((file, index) => (
                <FileBox key={index} file={file} onRemove={removeFile} />
              ))}
            </ScrollView>
            <View style={styles.inputContainer}>
              <TouchableOpacity
                style={styles.addButton}
                onPress={handleFileUpload}>
                <Text style={styles.addButtonText}>Add Files</Text>
              </TouchableOpacity>
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
            </View>
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
  filesPreviewContainer: {
    flexDirection: 'row',
    marginBottom: dimensions.spacings.xs,
  },
  bottom: {
    padding: 8,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addButton: {
    backgroundColor: colors.primaryLight,
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginRight: 8,
  },
  addButtonText: {
    color: colors.text,
    fontWeight: 'bold',
    fontSize: 14,
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
