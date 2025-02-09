import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Loader from './components/Loader';
import Login from './screens/auth/Login';
import Chat from './screens/chat/Chat';
import Txt from './components/Txt';
import Toast from './components/Toast';
import { useUser } from './store/user/useUser';
import { store } from './store/store';

const Stack = createStackNavigator();

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
              headerRight: () => <Txt>Profile</Txt>,
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
