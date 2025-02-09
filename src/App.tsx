import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
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

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  const { isLoggedIn } = useUser();

  return (
    <NavigationContainer fallback={<Loader center size="large" />}>
      {!isLoggedIn ? (
        <Login />
      ) : (
        <Stack.Navigator initialRouteName="Chat">
          <Stack.Screen
            name="Chat"
            component={Chat}
            options={{
              headerStyle: {
                backgroundColor: colors.primaryDark,
                height: 110,
              },
              headerTitleStyle: {
                color: colors.white,
                fontWeight: 'bold',
                fontSize: 20,
              },
              headerRight: () => <HeaderProfileButton />,
            }}
          />
          <Stack.Screen
            name="Profile"
            component={Profile}
            options={{
              headerStyle: {
                backgroundColor: colors.primaryDark,
                height: 110,
              },
              headerTitleStyle: {
                color: colors.white,
                fontWeight: 'bold',
                fontSize: 20,
              },
            }}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <AppNavigator />
        <Toast />
      </SafeAreaProvider>
    </Provider>
  );
};

export default App;
