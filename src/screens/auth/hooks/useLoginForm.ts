import * as Yup from 'yup';
import { useFormik } from 'formik';

function useLoginForm(
  login: (email: string, password: string) => Promise<void>,
  onSuccess?: (values: { email: string, password: string }) => void,
) {
  return useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Please enter a valid email address.')
        .required('Required.'),
      password: Yup.string()
        .required('Required.'),
    }),
    validateOnChange: true,
    onSubmit: async (values) => {
      await login(values.email, values.password);
      if (onSuccess) {
        onSuccess(values)
      }
    },
  });
}

export default useLoginForm;