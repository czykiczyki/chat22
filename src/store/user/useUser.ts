import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  login,
  logout,
  setUser,
  selectIsLoggedIn,
  selectUser,
  UserState,
  getCurrentUserAsync,
} from './userSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function useUser() {
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const user = useAppSelector(selectUser);

  const dispatch = useAppDispatch();

  const logOutUser = async () => {
    try {
      await AsyncStorage.removeItem('user-logged-in');
      dispatch(logout());
    } catch (e) {
      if (__DEV__) {
        console.error('Error removing user-logged-in from AsyncStorage:', e);
      }
    }
  };

  const logInUser = async (userState: UserState) => {
    try {
      await AsyncStorage.setItem('user-logged-in', 'true');
      dispatch(login(userState));
    } catch {
      if (__DEV__) {
        console.error('Error setting user-logged-in in AsyncStorage');
      }
    }
  };

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const isUserLoggedIn = await AsyncStorage.getItem('user-logged-in');
        if (isUserLoggedIn === 'true' && !user?.id) {
          dispatch(getCurrentUserAsync());
        }
      } catch (error) {
        if (__DEV__) {
          console.error('Error checking login status:', error);
        }
      }
    };

    checkLoginStatus();
  }, [dispatch]);

  return {
    logInUser,
    logOutUser,
    isLoggedIn,
    user,
    setUser,
  };
}
