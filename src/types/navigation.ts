import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Chat: undefined;
  Profile: undefined;
};

export type NavigationProps = NativeStackNavigationProp<RootStackParamList>;