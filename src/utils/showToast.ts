import RNToast from 'react-native-toast-message';
import { ToastType } from '../components/Toast/Toast';

export const showToast = (type: ToastType, message: string, serverMessage?: string) =>
  RNToast.show({ type, text1: message, text2: serverMessage || undefined });
