import * as Yup from 'yup';
import { useFormik } from 'formik';

function useLoginForm(
  login: (email: string, password: string) => Promise<void>,
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
      password: Yup.string().required('Required.'),
    }),
    validateOnChange: true,
    onSubmit: values => login(values.email, values.password),
  });
}

export default useLoginForm;
