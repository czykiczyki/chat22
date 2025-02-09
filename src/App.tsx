import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Loader from './components/Loader';
import Login from './screens/auth/Login';
import Chat from './screens/chat/Chat';
import Txt from './components/Txt';
import Toast from './components/Toast';

const Stack = createStackNavigator();

const App = () => {
  const isLoggedIn = false;

  return (
    <SafeAreaProvider>
      <NavigationContainer fallback={<Loader center size="large" />}>
        {!isLoggedIn ? (
          <Login />
        ) : (
          <Stack.Navigator initialRouteName="Chat">
            <Stack.Screen name="Chat" component={Chat} options={{
              headerRight: () => <Txt>Profile</Txt>
            }}/>
          </Stack.Navigator>
        )}
      </NavigationContainer>
      <Toast />
    </SafeAreaProvider>
  );
};

export default App;
