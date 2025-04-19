import axios from 'axios';
import { OPENAI_API_KEY } from '@env';
import RNFetchBlob from 'rn-fetch-blob';
import { gzip } from 'pako';
import { Platform } from 'react-native';
import ImageResizer from 'react-native-image-resizer';

const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';

export type ChatMessage = {
  role: string;
  content:
    | string
    | Array<{
        type: 'text' | 'image_url';
        text?: string;
        image_url?: {
          url: string;
        };
      }>;
};

type UploadedFile = {
  uri: string;
  name: string;
  type: string;
  size?: number;
  permanentPath?: string;
};

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const MAX_FILES_PER_MESSAGE = 10;
const CACHE_EXPIRY = 5 * 60 * 1000; // 5 minutes

const fileCache = new Map<string, { content: string; timestamp: number }>();

const detectEncoding = async (file: UploadedFile): Promise<'utf8' | 'ascii' | 'base64'> => {
  try {
    if (file.type.startsWith('image/')) {
      return 'base64';
    }

    const buffer = await RNFetchBlob.fs.readFile(file.uri, 'base64');
    const bytes = Buffer.from(buffer, 'base64');

    if (bytes[0] === 0xef && bytes[1] === 0xbb && bytes[2] === 0xbf) {
      return 'utf8';
    }

    const isAscii = bytes.every(byte => byte <= 127);
    return isAscii ? 'ascii' : 'utf8';
  } catch (error) {
    return 'utf8';
  }
};

const compressContent = (content: string): string => {
  try {
    const compressed = gzip(content);
    return btoa(String.fromCharCode(...compressed));
  } catch (error) {
    return content;
  }
};

const getCachedFile = (file: UploadedFile): string | null => {
  const cached = fileCache.get(file.uri);
  if (cached && Date.now() - cached.timestamp < CACHE_EXPIRY) {
    return cached.content;
  }
  return null;
};

const setCachedFile = (file: UploadedFile, content: string) => {
  fileCache.set(file.uri, {
    content,
    timestamp: Date.now(),
  });
};

export const streamChatGPTResponse = async (
  messages: ChatMessage[],
  files: UploadedFile[],
  onPartialResponse: (partial: string) => void
) => {
  try {
    console.log('Starting streamChatGPTResponse with:', {
      messageCount: messages.length,
      fileCount: files.length,
      firstMessage: messages[0],
      lastMessage: messages[messages.length - 1],
    });

    if (files.length > MAX_FILES_PER_MESSAGE) {
      throw new Error(`Maximum ${MAX_FILES_PER_MESSAGE} files allowed per message`);
    }

    const imageFiles = files.filter(f => f.type.startsWith('image/'));
    const textFiles = files.filter(f => !f.type.startsWith('image/'));

    console.log('Processing files:', {
      imageFiles: imageFiles.map(f => ({ name: f.name, type: f.type, size: f.size })),
      textFiles: textFiles.map(f => ({ name: f.name, type: f.type, size: f.size })),
    });

    const fileSegments: Array<{
      type: 'text' | 'image_url';
      text?: string;
      image_url?: { url: string };
    }> = [];

    // Process image files
    for (const file of imageFiles) {
      if (file.size && file.size > MAX_FILE_SIZE) {
        throw new Error(`File ${file.name} exceeds maximum size limit of 10MB`);
      }

      try {
        console.log(`Reading image file: ${file.name}`, {
          uri: file.uri,
          permanentPath: file.permanentPath,
        });

        const filePath = file.permanentPath || file.uri;

        const exists = await RNFetchBlob.fs.exists(filePath);
        if (!exists) {
          throw new Error(`File does not exist at path: ${filePath}`);
        }

        const sourcePath =
          Platform.OS === 'ios' && filePath.startsWith('file://')
            ? filePath.replace('file://', '')
            : filePath;

        console.log(`Reading file from path: ${sourcePath}`);

        let finalPath = sourcePath;
        const fileInfo = await RNFetchBlob.fs.stat(sourcePath);
        if (fileInfo.size > 500 * 1024) {
          console.log('Image is large, resizing...');
          try {
            const resizedImage = await ImageResizer.createResizedImage(
              sourcePath,
              800,
              800,
              'JPEG',
              80,
              0,
              undefined
            );
            console.log('Image resized successfully:', resizedImage);
            finalPath = resizedImage.path;
          } catch (resizeError) {
            console.error('Error resizing image:', resizeError);
            // If resizing fails, use the original image
          }
        }

        const base64 = await RNFetchBlob.fs.readFile(finalPath, 'base64');
        console.log(
          `Successfully processed image file: ${file.name}, size: ${base64.length} bytes`
        );

        fileSegments.push({
          type: 'image_url',
          image_url: {
            url: `data:${file.type};base64,${base64}`,
          },
        });
      } catch (error) {
        console.error(`Error reading image file ${file.name}:`, {
          error,
          file: {
            name: file.name,
            type: file.type,
            size: file.size,
            uri: file.uri,
            permanentPath: file.permanentPath,
          },
        });
        throw new Error(`Could not read image file: ${file.name}`);
      }
    }

    // Process text files
    for (const file of textFiles) {
      if (file.size && file.size > MAX_FILE_SIZE) {
        throw new Error(`File ${file.name} exceeds maximum size limit of 10MB`);
      }

      try {
        const cachedContent = getCachedFile(file);
        if (cachedContent) {
          console.log(`Using cached content for file: ${file.name}`);
          fileSegments.push({
            type: 'text',
            text: `File: ${file.name}\nContent:\n${cachedContent}`,
          });
          continue;
        }

        console.log(`Reading text file: ${file.name}`);
        const encoding = await detectEncoding(file);
        const content = await RNFetchBlob.fs.readFile(file.uri, encoding);
        const truncated = content.slice(0, 10000);
        console.log(`Successfully read text file: ${file.name}, size: ${truncated.length} chars`);

        const processedContent =
          truncated.length > 1024 * 1024 ? compressContent(truncated) : truncated;

        setCachedFile(file, processedContent);

        fileSegments.push({
          type: 'text',
          text: `File: ${file.name}\nContent:\n${processedContent}`,
        });
      } catch (error) {
        console.error(`Error reading text file ${file.name}:`, error);
        throw new Error(`Could not read text file: ${file.name}`);
      }
    }

    const userMessageWithFiles = {
      role: 'user',
      content: [
        { type: 'text', text: 'Oto pliki, które dołączam. Co o nich sądzisz?' },
        ...fileSegments,
      ],
    };

    const enhancedMessages = [
      ...messages,
      ...(fileSegments.length > 0 ? [userMessageWithFiles] : []),
    ];

    console.log('Sending request to OpenAI API with:', {
      model: 'gpt-4-turbo',
      messageCount: enhancedMessages.length,
      hasFiles: fileSegments.length > 0,
      lastMessage: enhancedMessages[enhancedMessages.length - 1],
    });

    const response = await axios({
      method: 'post',
      url: OPENAI_API_URL,
      data: {
        model: 'gpt-4-turbo',
        messages: enhancedMessages,
        stream: true,
      },
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      responseType: 'text',
      timeout: 60000,
    }).catch(error => {
      console.error('Axios error details:', {
        message: error.message,
        code: error.code,
        response: error.response?.data,
        status: error.response?.status,
        config: {
          url: error.config?.url,
          method: error.config?.method,
          timeout: error.config?.timeout,
          headers: {
            ...error.config?.headers,
            Authorization: 'Bearer [REDACTED]',
          },
        },
      });

      if (error.code === 'ECONNABORTED') {
        throw new Error('Request timeout. Please check your internet connection and try again.');
      }
      if (!error.response) {
        throw new Error('Network error. Please check your internet connection and try again.');
      }
      throw error;
    });

    console.log('Received response from OpenAI API');

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
            console.error('Error parsing JSON from stream:', {
              error,
              line,
              jsonString,
            });
          }
        }
      }
    });
  } catch (error) {
    console.error('Error in streamChatGPTResponse:', {
      error,
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
    });

    if (axios.isAxiosError(error)) {
      if (error.response) {
        console.error('API Error Response:', {
          status: error.response.status,
          data: error.response.data,
          headers: error.response.headers,
        });
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
