import { DocumentPickerResponse } from 'react-native-document-picker';

export type UploadedFile = Omit<
  DocumentPickerResponse,
  'name' | 'type' | 'size' | 'fileCopyUri'
> & {
  name: string;
  type: string;
  size: number;
  permanentPath?: string;
  fileCopyUri?: string | null;
};
