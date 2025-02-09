import { UserType } from '../store/user/userSlice';
import { hardcodedCredentials, hardcodedUserData } from './mocks';

type LoginCredentials = {
  email: string;
  password: string;
};

export const login = (credentials: LoginCredentials): Promise<UserType> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (
        credentials.email === hardcodedCredentials.email &&
        credentials.password === hardcodedCredentials.password
      ) {
        resolve(hardcodedUserData);
      } else {
        reject(new Error('Incorrect credentials.'));
      }
    }, 2000);
  });
};
