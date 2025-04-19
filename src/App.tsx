import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import RNFetchBlob from 'rn-fetch-blob';
import Loader from './components/Loader';
import Login from './screens/auth/Login';
import Chat from './screens/chat/Chat';
import Toast from './components/Toast';
import { useUser } from './store/user/useUser';
import { store } from './store/store';
import { colors } from './theme';
import HeaderProfileButton from './components/HeaderProfileButton/HeaderProfileButton';
import { RootStackParamList } from './types/navigation';
import Profile from './screens/profile/Profile';
import { StyleSheet, View } from 'react-native';

const Stack = createStackNavigator<RootStackParamList>();

const headerRight = () => <HeaderProfileButton />;

const AppNavigator = () => {
  const { isLoggedIn } = useUser();
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    // Wait for the actual auth check to complete
    if (isLoggedIn !== undefined) {
      setIsCheckingAuth(false);
    }
  }, [isLoggedIn]);

  if (isCheckingAuth) {
    return (
      <View style={styles.loaderContainer}>
        <Loader center size="large" />
      </View>
    );
  }
  const fallback = <Loader center size="large" />;
  return (
    <NavigationContainer fallback={fallback}>
      {!isLoggedIn ? (
        <Login />
      ) : (
        <Stack.Navigator initialRouteName="Chat">
          <Stack.Screen
            name="Chat"
            component={Chat}
            options={{
              headerStyle: styles.headerStyle,
              headerTitleStyle: styles.headerTitleStyle,
              headerRight,
            }}
          />
          <Stack.Screen
            name="Profile"
            component={Profile}
            options={{
              headerStyle: styles.headerStyle,
              headerTitleStyle: styles.headerTitleStyle,
            }}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

const App = () => {
  useEffect(() => {
    const dirs = RNFetchBlob.fs.dirs;
    RNFetchBlob.config({
      fileCache: true,
      appendExt: 'txt',
      path: `${dirs.DocumentDir}/`,
    });
  }, []);

  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <AppNavigator />
        <Toast />
      </SafeAreaProvider>
    </Provider>
  );
};

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  headerStyle: {
    backgroundColor: colors.primaryDark,
    height: 110,
  },
  headerTitleStyle: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: 20,
  },
});

export default App;
