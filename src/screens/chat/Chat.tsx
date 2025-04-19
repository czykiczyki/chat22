import React, { useState, useEffect, useRef, useCallback } from 'react';
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
  StyleSheet,
} from 'react-native';
import { useChat } from './hooks/useChat';
import MessageBubble from './components/MessageBubble';
import FileBox from './components/FileBox';
import { colors, dimensions } from '../../theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import { pickDocument } from './utils/filePicker';
import { showToast } from '../../utils/showToast';
import SvgIcon from '../../components/SvgIcon';
import RNFetchBlob from 'rn-fetch-blob';
import { UploadedFile } from '../../types/chat';

const copyFileToPermanentLocation = async (sourceUri: string): Promise<string> => {
  const cleanSourceUri = sourceUri.replace('file://', '');

  try {
    const sourceExists = await RNFetchBlob.fs.exists(cleanSourceUri);
    if (!sourceExists) {
      throw new Error(`Source file does not exist: ${cleanSourceUri}`);
    }

    return cleanSourceUri;
  } catch (error) {
    throw error;
  }
};

const Chat = () => {
  const { messages, isLoading, sendMessage } = useChat();
  const [newMessage, setNewMessage] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [filesToCleanup, setFilesToCleanup] = useState<UploadedFile[]>([]);
  const flatListRef = useRef<FlatList>(null);
  const isDisabled = isProcessing || isLoading;

  const scrollToBottom = useCallback(() => {
    if (flatListRef.current && messages.length > 0) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  }, [messages]);

  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const handleFileUpload = async () => {
    try {
      const result = await pickDocument();
      if (!result) {
        showToast('error', 'No file selected');
        return;
      }

      const { uri, name, type, size } = result;
      const fileName = name?.trim() || `image_${Date.now()}.jpg`;

      try {
        const permanentPath = await copyFileToPermanentLocation(uri);

        const exists = await RNFetchBlob.fs.exists(permanentPath);
        if (!exists) {
          throw new Error('File does not exist at permanent path');
        }

        setUploadedFiles(prev => [
          ...prev,
          {
            ...result,
            uri: permanentPath,
            name: fileName,
            type: type || 'image/jpeg',
            size: size || 0,
            permanentPath,
          },
        ]);
      } catch (copyError) {
        showToast('error', 'Failed to copy file. Please try again.');
      }
    } catch (error) {
      showToast('error', 'Failed to upload file');
    }
  };

  const removeFile = async (index: number) => {
    const fileToRemove = uploadedFiles[index];
    if (fileToRemove.permanentPath) {
      try {
        await RNFetchBlob.fs.unlink(fileToRemove.permanentPath);
      } catch (error) {
        // Silent error on cleanup
      }
    }

    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSend = async () => {
    if (newMessage.trim() || uploadedFiles.length > 0) {
      setIsProcessing(true);
      try {
        // Make sure all files have permanent paths and exist
        const filesWithPaths = uploadedFiles.map(file => {
          if (!file.permanentPath) {
            throw new Error(`File ${file.name} does not have a permanent path`);
          }
          return {
            ...file,
            permanentPath: file.permanentPath,
          };
        });

        // Move files to cleanup queue before sending
        setFilesToCleanup(prev => [...prev, ...filesWithPaths]);

        await sendMessage(newMessage, filesWithPaths);
        setNewMessage('');
        setUploadedFiles([]);
      } finally {
        setIsProcessing(false);
      }
    }
  };

  const cleanupFiles = async (files: UploadedFile[]) => {
    for (const file of files) {
      if (file.permanentPath) {
        try {
          await RNFetchBlob.fs.unlink(file.permanentPath);
        } catch (error) {
          // Silent error on cleanup
        }
      }
    }
  };

  // Cleanup effect to remove permanent files
  useEffect(() => {
    const cleanupFilesEffect = async () => {
      if (filesToCleanup.length > 0 && !isProcessing) {
        await cleanupFiles(filesToCleanup);
        setFilesToCleanup([]);
      }
    };

    const timer = setTimeout(cleanupFilesEffect, 5000);
    return () => clearTimeout(timer);
  }, [filesToCleanup, isProcessing]);

  // Cleanup effect for component unmount
  useEffect(() => {
    return () => {
      if (!isProcessing) {
        cleanupFiles(filesToCleanup);
      }
    };
  }, [filesToCleanup, isProcessing]);

  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={90}
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <TouchableWithoutFeedback onPress={dismissKeyboard}>
        <View style={styles.innerContainer}>
          <FlatList
            ref={flatListRef}
            data={messages}
            renderItem={({ item }) => <MessageBubble message={item} isLoading={isLoading} />}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.messagesList}
            onContentSizeChange={scrollToBottom}
            onLayout={scrollToBottom}
          />

          <SafeAreaView style={styles.bottom} edges={['bottom']}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.filesPreviewContainer}
            >
              {uploadedFiles.map((file, index) => (
                <FileBox key={index} file={file} onRemove={() => removeFile(index)} />
              ))}
            </ScrollView>
            <View style={styles.inputContainer}>
              <TouchableOpacity
                style={[styles.addButton, isDisabled && styles.disabled]}
                disabled={isDisabled}
                onPress={handleFileUpload}
              >
                <SvgIcon.Upload />
              </TouchableOpacity>
              <TextInput
                style={[styles.input, isDisabled && styles.disabled]}
                placeholder="Write a message..."
                placeholderTextColor={colors.grey}
                value={newMessage}
                onChangeText={setNewMessage}
                editable={!isDisabled}
              />
              <TouchableOpacity
                style={[styles.sendButton, isDisabled && styles.disabled]}
                onPress={handleSend}
                disabled={isDisabled}
              >
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
    padding: 6,
    marginRight: dimensions.spacings.xs,
  },
  input: {
    flex: 1,
    padding: dimensions.spacings.sm,
    fontSize: 16,
    backgroundColor: colors.darkGrey,
    borderRadius: dimensions.radiuses.md,
    marginRight: dimensions.spacings.sm,
    color: colors.text,
  },
  sendButton: {
    backgroundColor: colors.primary,
    borderRadius: dimensions.radiuses.md,
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  sendButtonText: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: 16,
  },
  disabled: {
    opacity: 0.5,
  },
});

export default Chat;
