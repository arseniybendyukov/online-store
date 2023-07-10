import { useFormik } from 'formik';
import css from './index.module.css';
import { Input } from '../../../components/Input';
import { Button } from '../../../components/Button';
import { AuthNestedPaths, NavPaths, paramPath } from '../../../navigation';
import { FormTemplate } from '../FormTemplate';
import { REQUIRED_FIELD } from '../../../consts/forms';

interface FormValues {
  firstName: string;
  lastName: string;
  username: string;
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

  if (!values.username) {
    errors.username = REQUIRED_FIELD;
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
  const formik = useFormik<FormValues>({
    initialValues: {
      firstName: '',
      lastName: '',
      username: '',
      password1: '',
      password2: '',
    },
    validate,
    onSubmit: (values, { resetForm }) => {
      console.log(values);
      resetForm();
    }
  });

  return (
    <FormTemplate
      heading='Регистрация'
      width={600}
      link={{
        path: paramPath(NavPaths.AUTH, AuthNestedPaths.LOGIN),
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
          label='Логин'
          name='username'
          onChange={formik.handleChange}
          value={formik.values.username}
          isTouched={formik.touched.username}
          error={formik.errors.username}
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
          state={{ default: { text: 'Отправить', icon: undefined } }}
        />
      </form>
    </FormTemplate>
  );
}
