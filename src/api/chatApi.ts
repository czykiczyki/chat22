import axios from 'axios';
import { OPENAI_API_KEY } from '@env';

const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';

export type ChatMessage = {
  role: string;
  content: string;
};

type UploadedFile = {
  uri: string;
  name: string;
  type: string;
};

export const streamChatGPTResponse = async (
  messages: ChatMessage[],
  files: UploadedFile[],
  onPartialResponse: (partial: string) => void,
) => {
  try {
    const formData = new FormData();

    formData.append('messages', JSON.stringify(messages));
    formData.append('model', 'gpt-3.5-turbo');
    formData.append('stream', 'true');

    files.forEach((file, index) => {
      formData.append(`file_${index}`, {
        uri: file.uri,
        name: file.name,
        type: file.type,
      });
    });

    const response = await axios({
      method: 'post',
      url: OPENAI_API_URL,
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
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
      if (error.response) {
        console.error('API Error:', error.response.status, error.response.data);
      } else {
        console.error('API Error (no response):', error.message);
      }
    } else if (error instanceof Error) {
      console.error('Error sending message to ChatGPT:', error.message);
    } else {
      console.error('Unknown error occurred:', error);
    }

    throw new Error('Could not send message to ChatGPT.');
  }
};
