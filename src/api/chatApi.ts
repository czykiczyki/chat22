import axios from 'axios';
import { OPENAI_API_KEY } from '@env';

const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';
const OPENAI_FILE_UPLOAD_URL = 'https://api.openai.com/v1/files';

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
    let fileIds: string[] = [];

    if (files.length > 0) {
      fileIds = await uploadFilesToOpenAI(files);
    }

    const enhancedMessages = [
      ...messages,
      ...(fileIds.length > 0
        ? [
            {
              role: 'user',
              content: `Attached files:\n${fileIds
                .map(id => `File ID: ${id}`)
                .join('\n')}`,
            },
          ]
        : []),
    ];

    const response = await axios({
      method: 'post',
      url: OPENAI_API_URL,
      data: {
        model: 'gpt-3.5-turbo',
        messages: enhancedMessages,
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
            if (data.choices && data.choices[0].delta?.content) {
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

const uploadFilesToOpenAI = async (
  files: UploadedFile[],
): Promise<string[]> => {
  try {
    const uploadPromises = files.map(async file => {
      const formData = new FormData();

      formData.append('file', {
        uri: file.uri,
        name: file.name,
        type: file.type,
      });

      formData.append('purpose', 'user_data');

      const response = await axios.post(OPENAI_FILE_UPLOAD_URL, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Accept: 'application/json',
          Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
        timeout: 120000,
      });

      return response.data.id;
    });

    return await Promise.all(uploadPromises);
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      console.error('API Error:', error.response?.status, error.response?.data);
    } else {
      console.error('Error uploading files to OpenAI:', error.message);
    }

    throw new Error('File upload to OpenAI failed.');
  }
};
