import { useFormik } from 'formik';
import { INVALID_EMAIL, REQUIRED_FIELD, isEmailValid } from '../../../utils/forms';
import { AuthNestedPaths, NavPaths, ProfileNestedPaths } from '../../../navigation';
import { ModalTemplate } from '../ModalTemplate';
import css from './index.module.css';
import { Input } from '../../../components/Input';
import { Button } from '../../../components/Button';
import { useLoginMutation } from '../../../redux/api';
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
      await login({
        email: values.email,
        password: values.password,
      })
        .unwrap()
        .then((result) => {
          if (!('error' in result)) {
            resetForm();
            navigate(`${NavPaths.PROFILE}/${ProfileNestedPaths.PERSONAL_INFO}`);
          }
        })
        .catch((e) => console.error('error'));
    }
  });

  useEffect(() => {
    if (error && 'data' in error) {
      const data = error.data as Record<string, string[]>;

      if (data instanceof Object && 'email' in data) {
        formik.setFieldError('email', data.email[0]);
      }
    }
  }, [error, formik]);

  return (
    <ModalTemplate
      heading='Log in'
      width={500}
      link={{
        path: `${NavPaths.AUTH}/${AuthNestedPaths.REGISTRATION}`,
        name: 'Register a new account',
      }}
    >
      <form onSubmit={formik.handleSubmit} className={css.form}>
        <Input
          label='Email'
          name='email'
          type='email'
          onChange={formik.handleChange}
          value={formik.values.email}
          isTouched={formik.touched.email}
          error={formik.errors.email}
        />

        <Input
          label='Password'
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
          state={{ default: { text: 'Log in', icon: undefined } }}
        />

        {formik.errors.email === 'Email not verified!' && (
          <Link to={`${NavPaths.AUTH}/${AuthNestedPaths.EMAIL_RESEND}`} className='link'>Resend verification</Link>
        )}
      </form>
    </ModalTemplate>
  );
}
