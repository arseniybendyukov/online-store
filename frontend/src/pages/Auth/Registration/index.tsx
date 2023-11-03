import { useFormik } from 'formik';
import css from './index.module.css';
import { Input } from '../../../components/Input';
import { Button } from '../../../components/Button';
import { AuthNestedPaths, NavPaths } from '../../../navigation';
import { ModalTemplate } from '../ModalTemplate';
import { INVALID_EMAIL, REQUIRED_FIELD, isEmailValid } from '../../../utils/forms';
import { useRegisterMutation } from '../../../redux/apis/authApi';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useEffect } from 'react';

interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  password1: string;
  password2: string;
}

function validate(values: FormValues) {
  const errors: Partial<FormValues> = {};
 
  if (!values.firstName) {
    errors.firstName = REQUIRED_FIELD;
  } else if (values.firstName.length > 150) {
    errors.firstName = 'Максимальная длина: 150 символов!';
  }

  if (!values.lastName) {
    errors.lastName = REQUIRED_FIELD;
  } else if (values.lastName.length > 150) {
    errors.lastName = 'Максимальная длина: 150 символов!';
  }

  if (!values.email) {
    errors.email = REQUIRED_FIELD;
  } else if (!isEmailValid(values.email)) {
    errors.email = INVALID_EMAIL;
  }

  if (!values.password1) {
    errors.password1 = REQUIRED_FIELD;
  }

  if (!values.password2) {
    errors.password2 = REQUIRED_FIELD;
  }

  if (values.password1 !== values.password2) {
    errors.password2 = 'Пароли не совпадают!';
  }

  return errors;
}

export function Registration() {
  const navigate = useNavigate();
  const [register, { isLoading, error }] = useRegisterMutation();

  const formik = useFormik<FormValues>({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password1: '',
      password2: '',
    },
    validate,
    onSubmit: async (values, { resetForm }) => {
      const result = await register({
        email: values.email,
        first_name: values.firstName,
        last_name: values.lastName,
        password: values.password1,
      });

      if (!('error' in result)) {
        resetForm();
        toast('На электронную почту было отправлено письмо, пройдите верификацию!', { type: 'info', autoClose: false });
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
      heading='Регистрация'
      width={600}
      link={{
        path: `${NavPaths.AUTH}/${AuthNestedPaths.LOGIN}`,
        name: 'Вход',
      }}
    >
      <form onSubmit={formik.handleSubmit} className={css.form}>
        <div className={css.row}>
          <Input
            label='Имя'
            name='firstName'
            onChange={formik.handleChange}
            value={formik.values.firstName}
            isTouched={formik.touched.firstName}
            error={formik.errors.firstName}
          />

          <Input
            label='Фамилия'
            name='lastName'
            onChange={formik.handleChange}
            value={formik.values.lastName}
            isTouched={formik.touched.lastName}
            error={formik.errors.lastName}
          />
        </div>

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
          name='password1'
          type='password'
          onChange={formik.handleChange}
          value={formik.values.password1}
          isTouched={formik.touched.password1}
          error={formik.errors.password1}
        />

        <Input
          label='Подтверждение пароля'
          name='password2'
          type='password'
          onChange={formik.handleChange}
          value={formik.values.password2}
          isTouched={formik.touched.password2}
          error={formik.errors.password2}
        />

        <Button
          type='submit'
          isLoading={isLoading}
          state={{ default: { text: 'Зарегистрироваться', icon: undefined } }}
        />
      </form>
    </ModalTemplate>
  );
}
