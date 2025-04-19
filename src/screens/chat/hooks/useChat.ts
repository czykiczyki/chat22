import { useState } from 'react';
import { streamChatGPTResponse, ChatMessage } from '../../../api/chatApi';
import RNFetchBlob from 'rn-fetch-blob';

type UploadedFile = {
  uri: string;
  name: string;
  type: string;
  size: number;
  permanentPath?: string;
};

type ContentSegment = {
  type: 'text' | 'image_url';
  text?: string;
  image_url?: {
    url: string;
  };
};

export function useChat() {
  const [messages, setMessages] = useState<
    {
      id: string;
      text: string;
      sender: 'me' | 'assistant';
      files?: Array<{
        uri: string;
        type: string;
      }>;
    }[]
  >([]);
  const [isLoading, setIsLoading] = useState(false);

  const addMessage = (text: string, sender: 'me' | 'assistant', files?: UploadedFile[]) => {
    setMessages(prevMessages => [
      ...prevMessages,
      {
        id: String(prevMessages.length + 1),
        text,
        sender,
        files: files?.map(file => ({
          uri: file.permanentPath || file.uri,
          type: file.type,
        })),
      },
    ]);
  };

  const sendMessage = async (userMessage: string, files: UploadedFile[] = []) => {
    const userMessageId = String(messages.length + 1);
    addMessage(userMessage, 'me', files);

    const tempAssistantId = String(parseInt(userMessageId, 10) + 1);
    addMessage('', 'assistant');

    let partialResponse = '';

    setIsLoading(true);

    try {
      const processFiles = async (): Promise<ContentSegment[]> => {
        if (files.length === 0) {
          return [];
        }

        const segments: ContentSegment[] = [];

        for (const file of files) {
          try {
            const filePath = file.permanentPath || file.uri;

            if (!filePath) {
              throw new Error(`No file path found for file: ${file.name}`);
            }

            const cleanPath = filePath.replace('file://', '');

            const exists = await RNFetchBlob.fs.exists(cleanPath);
            if (!exists) {
              throw new Error(`File does not exist at path: ${cleanPath}`);
            }

            if (file.type && file.type.startsWith('image/')) {
              const base64 = await RNFetchBlob.fs.readFile(cleanPath, 'base64');
              segments.push({
                type: 'image_url',
                image_url: {
                  url: `data:${file.type};base64,${base64}`,
                },
              });
            } else {
              const content = await RNFetchBlob.fs.readFile(cleanPath, 'utf8');
              segments.push({
                type: 'text',
                text: `File: ${file.name}\nContent:\n${content}`,
              });
            }
          } catch (error) {
            throw error;
          }
        }

        return segments;
      };

      const fileSegments = await processFiles();

      const chatMessages: ChatMessage[] = [
        { role: 'system', content: 'You are a helpful assistant.' },
        ...messages.map(msg => ({
          role: msg.sender === 'me' ? 'user' : 'assistant',
          content: msg.text,
        })),
        {
          role: 'user',
          content:
            fileSegments.length > 0
              ? [{ type: 'text', text: userMessage }, ...fileSegments]
              : userMessage,
        },
      ];

      await streamChatGPTResponse(chatMessages, files, partial => {
        partialResponse += partial;

        setMessages(prevMessages => {
          return prevMessages.map(msg =>
            msg.id === tempAssistantId ? { ...msg, text: partialResponse } : msg
          );
        });
      });
    } catch (error) {
      setMessages(prevMessages => {
        return prevMessages.map(msg =>
          msg.id === tempAssistantId ? { ...msg, text: 'Error fetching response.' } : msg
        );
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    messages,
    isLoading,
    sendMessage,
  };
}
