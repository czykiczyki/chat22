import { DocumentPickerResponse, pick, types } from 'react-native-document-picker';
import RNFetchBlob from 'rn-fetch-blob';
import { Platform } from 'react-native';

export async function pickDocument(): Promise<DocumentPickerResponse | null> {
  try {
    const result = await pick({
      type: [types.images],
      allowMultiSelection: false,
      copyTo: 'documentDirectory',
      mode: 'open',
    });

    let document: DocumentPickerResponse | null = null;

    if (Array.isArray(result)) {
      document = result.length > 0 && isDocumentPickerResponse(result[0]) ? result[0] : null;
    } else if (isDocumentPickerResponse(result)) {
      document = result;
    }

    if (document) {
      // Clean the file path for iOS
      let filePath = document.uri;
      if (Platform.OS === 'ios' && filePath.startsWith('file://')) {
        filePath = filePath.replace('file://', '');
      }

      // Check if file exists using the cleaned path
      const exists = await RNFetchBlob.fs.exists(filePath);
      if (!exists) {
        throw new Error('Selected file does not exist');
      }

      // Update the document URI to the cleaned path
      document.uri = filePath;

      return document;
    }

    return null;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Failed to pick document');
  }
}

function isDocumentPickerResponse(obj: any): obj is DocumentPickerResponse {
  return obj && typeof obj === 'object' && 'uri' in obj && 'type' in obj && 'name' in obj;
}
