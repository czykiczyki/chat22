import axios from 'axios';
import { OPENAI_API_KEY } from '@env';

const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';

export type ChatMessage = {
  role: string;
  content: string;
};

export const streamChatGPTResponse = async (
  messages: ChatMessage[],
  onPartialResponse: (partial: string) => void,
) => {
  try {
    const response = await axios({
      method: 'post',
      url: OPENAI_API_URL,
      data: {
        model: 'gpt-3.5-turbo',
        messages,
        stream: true,
      },
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      responseType: 'text',
    });

    response.data.split('\n').forEach((line: string) => {
      if (line.startsWith('data: ')) {
        const jsonString = line.substring(6).trim();
        if (jsonString !== '[DONE]') {
          try {
            const data = JSON.parse(jsonString);
            if (
              data.choices &&
              data.choices[0].delta &&
              data.choices[0].delta.content
            ) {
              onPartialResponse(data.choices[0].delta.content);
            }
          } catch (error) {
            console.error('Error parsing JSON:', error);
          }
        }
      }
    });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(error.response?.status, error.response?.data);
    } else if (error instanceof Error) {
      console.error('Error sending message to ChatGPT:', error.message);
    } else {
      console.error('Unknown error occurred.');
    }

    throw new Error('Could not send message to ChatGPT.');
  }
};
