import { useFormik } from 'formik';
import { INVALID_EMAIL, REQUIRED_FIELD, isEmailValid } from '../../../utils/forms';
import { AuthNestedPaths, NavPaths } from '../../../navigation';
import { ModalTemplate } from '../ModalTemplate';
import css from './index.module.css';
import { Input } from '../../../components/Input';
import { Button } from '../../../components/Button';
import { useLoginMutation } from '../../../redux/apis/authApi';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

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
  const navigate = useNavigate();
  const [login, { isLoading, error }] = useLoginMutation();

  const formik = useFormik<FormValues>({
    initialValues: {
      email: '',
      password: '',
    },
    validate,
    onSubmit: async (values, { resetForm }) => {
      const result = await login({
        email: values.email,
        password: values.password,
      });

      if (!('error' in result)) {
        resetForm();
        navigate(NavPaths.PROFILE);
      }
    }
  });

  useEffect(() => {
    if (error && 'data' in error) {
      const data = error.data as Record<string, string[]>;

      if (data instanceof Object && 'email' in data) {
        formik.setFieldError('email', data.email[0]);
      }
    }
  }, [error]);

  return (
    <ModalTemplate
      heading='Вход'
      width={500}
      link={{
        path: `${NavPaths.AUTH}/${AuthNestedPaths.REGISTRATION}`,
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
          isLoading={isLoading}
          state={{ default: { text: 'Войти', icon: undefined } }}
        />

        {formik.errors.email === 'Электронная почта не верифицирована!' && (
          <Link to={`${NavPaths.AUTH}/${AuthNestedPaths.EMAIL_RESEND}`} className='link'>Выслать письмо ещё раз</Link>
        )}
      </form>
    </ModalTemplate>
  );
}
