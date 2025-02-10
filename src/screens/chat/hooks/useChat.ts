import { useState } from 'react';
import { streamChatGPTResponse, ChatMessage } from '../../../api/chatApi';

type UploadedFile = {
  uri: string;
  name: string;
  type: string;
};

export function useChat() {
  const [messages, setMessages] = useState<
    { id: string; text: string; sender: 'me' | 'assistant' }[]
  >([]);
  const [isLoading, setIsLoading] = useState(false);

  const addMessage = (text: string, sender: 'me' | 'assistant') => {
    setMessages(prevMessages => [
      ...prevMessages,
      { id: String(prevMessages.length + 1), text, sender },
    ]);
  };

  const sendMessage = async (userMessage: string, files: UploadedFile[] = []) => {
    const userMessageId = String(messages.length + 1);
    addMessage(userMessage, 'me');

    const tempAssistantId = String(parseInt(userMessageId) + 1);
    addMessage('', 'assistant');

    let partialResponse = '';

    setIsLoading(true);

    try {
      const chatMessages: ChatMessage[] = [
        { role: 'system', content: 'You are a helpful assistant.' },
        ...messages.map(msg => ({
          role: msg.sender === 'me' ? 'user' : 'assistant',
          content: msg.text,
        })),
        { role: 'user', content: userMessage },
      ];

      await streamChatGPTResponse(chatMessages, files, partial => {
        partialResponse += partial;

        setMessages(prevMessages => {
          return prevMessages.map(msg =>
            msg.id === tempAssistantId
              ? { ...msg, text: partialResponse }
              : msg,
          );
        });
      });
    } catch (error) {
      setMessages(prevMessages => {
        return prevMessages.map(msg =>
          msg.id === tempAssistantId
            ? { ...msg, text: 'Error fetching response.' }
            : msg,
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
