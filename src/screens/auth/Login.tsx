import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Txt from '../../components/Txt/Txt';
import { dimensions } from '../../theme';
import useLoginForm from './hooks/useLoginForm';

const Login = () => {
  const { navigate } = useNavigation();

  const login = async (email: string, password: string) => {};

  const formik = useLoginForm(login, values => {
    // TODO set user logged in
  });

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <Txt variant="headline" style={styles.spacings}>
          Login
        </Txt>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  spacings: {
    padding: dimensions.spacings.md,
  },
});

export default Login;
