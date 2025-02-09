import React from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Txt from '../../components/Txt/Txt';
import { dimensions } from '../../theme';
import useLoginForm from './hooks/useLoginForm';
import { authApi } from '../../api';
import { showToast } from '../../utils/showToast';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Input from '../../components/Input';
import PasswordInput from '../../components/PasswordInput';
import Button from '../../components/Button';
import { useUser } from '../../store/user/useUser';

const Login = () => {
  const [isPending, setPending] = React.useState<boolean>(false);
  const { logInUser } = useUser();

  const login = async (email: string, password: string) => {
    setPending(true);
    try {
      const user = await authApi.login({ email, password });
      await logInUser({ user, isLoggedIn: true });
    } catch (e) {
      const errorMsg = e instanceof Error ? e.message : 'An error occurred.';
      showToast('error', 'Login failed.', errorMsg);
    } finally {
      setPending(false);
    }
  };

  const formik = useLoginForm(login);

  return (
    <KeyboardAwareScrollView
      keyboardShouldPersistTaps="handled"
      extraScrollHeight={50}
      showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <SafeAreaView>
          <Txt variant="headline" style={styles.spacings}>
            Login
          </Txt>
          <View style={styles.spacings}>
            <Input
              error={formik.touched.email && !!formik.errors.email}
              errorMessage={formik.errors.email}
              onChangeText={formik.handleChange('email')}
              label="Email Address"
              placeholder="Enter your email address"
              value={formik.values.email}
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="email-address"
            />
            <PasswordInput
              label="Password"
              placeholder="Password"
              value={formik.values.password}
              onChangeText={formik.handleChange('password')}
            />
          </View>
          <View style={styles.buttonContainer}>
            <Button
              title="Log In"
              onPress={formik.handleSubmit}
              loading={isPending}
            />
          </View>
        </SafeAreaView>
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  spacings: {
    padding: dimensions.spacings.md,
  },
  buttonContainer: {
    marginHorizontal: dimensions.spacings.md,
  },
});

export default Login;
