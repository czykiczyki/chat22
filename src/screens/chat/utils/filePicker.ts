import { pick, DocumentPickerResponse } from '@react-native-documents/picker';

export async function pickDocument(): Promise<DocumentPickerResponse | null> {
  try {
    const result = await pick();

    if (Array.isArray(result) && result.length > 0) {
      return result[0];
    }

    if (result && 'uri' in result) {
      return result as unknown as DocumentPickerResponse;
    }

    return null;
  } catch (error) {
    console.error('Error picking document:', error);
    return null;
  }
}
