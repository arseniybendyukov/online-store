import { useFormik } from 'formik';
import { REQUIRED_FIELD } from '../../../consts/forms';
import { AuthNestedPaths, NavPaths, paramPath } from '../../../navigation';
import { FormTemplate } from '../FormTemplate';
import css from './index.module.css';
import { Input } from '../../../components/Input';
import { Button } from '../../../components/Button';

interface FormValues {
  username: string;
  password: string;
}

function validate(values: FormValues) {
  const errors: Partial<FormValues> = {};

  if (!values.username) {
    errors.username = REQUIRED_FIELD;
  }

  if (!values.password) {
    errors.password = REQUIRED_FIELD;
  }

  return errors;
}

export function Login() {
  const formik = useFormik<FormValues>({
    initialValues: {
      username: '',
      password: '',
    },
    validate,
    onSubmit: (values, { resetForm }) => {
      console.log(values);
      resetForm();
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
          label='Логин'
          name='username'
          onChange={formik.handleChange}
          value={formik.values.username}
          isTouched={formik.touched.username}
          error={formik.errors.username}
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
