import { useFormik } from 'formik';
import { INVALID_EMAIL, REQUIRED_FIELD, isEmailValid } from '../../../utils/forms';
import { AuthNestedPaths, NavPaths, paramPath } from '../../../navigation';
import { FormTemplate } from '../FormTemplate';
import css from './index.module.css';
import { Input } from '../../../components/Input';
import { Button } from '../../../components/Button';
import { useObtainTokensMutation } from '../../../redux/apis/authApi';

interface FormValues {
  email: string;
  password: string;
}

function validate(values: FormValues) {
  const errors: Partial<FormValues> = {};

  if (!values.email) {
    errors.email = REQUIRED_FIELD;
  } else if (!isEmailValid(values.email)) {
    errors.email = INVALID_EMAIL;
  }

  if (!values.password) {
    errors.password = REQUIRED_FIELD;
  }

  return errors;
}

export function Login() {
  const [login, response] = useObtainTokensMutation();

  const formik = useFormik<FormValues>({
    initialValues: {
      email: '',
      password: '',
    },
    validate,
    onSubmit: async (values, { resetForm }) => {
      try {
        await login({
          email: values.email,
          password: values.password,
        });

        resetForm();
      } catch (error) {
        console.error('rejected', error);
      }
    }
  });

  return (
    <FormTemplate
      heading='Вход'
      width={450}
      link={{
        path: paramPath(NavPaths.AUTH, AuthNestedPaths.REGISTRATION),
        name: 'Регистрация',
      }}
    >
      <form onSubmit={formik.handleSubmit} className={css.form}>
        <Input
          label='Электронная почта'
          name='email'
          type='email'
          onChange={formik.handleChange}
          value={formik.values.email}
          isTouched={formik.touched.email}
          error={formik.errors.email}
        />

        <Input
          label='Пароль'
          name='password'
          type='password'
          onChange={formik.handleChange}
          value={formik.values.password}
          isTouched={formik.touched.password}
          error={formik.errors.password}
        />

        <Button
          type='submit'
          state={{ default: { text: 'Отправить', icon: undefined } }}
        />
      </form>
    </FormTemplate>
  );
}
