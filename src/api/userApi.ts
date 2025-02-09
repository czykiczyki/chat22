import { UserType } from '../store/user/userSlice';
import { hardcodedUserData } from './mocks';

export const getUser = (): Promise<UserType> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(hardcodedUserData);
    }, 1500);
  });
};
