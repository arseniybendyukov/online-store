import { useFormik } from 'formik';
import css from './index.module.css';
import { Input } from '../../../components/Input';
import { Button } from '../../../components/Button';
import { AuthNestedPaths, NavPaths, PDFDocumentsPaths } from '../../../navigation';
import { ModalTemplate } from '../ModalTemplate';
import { INVALID_EMAIL, INVALID_PHONE_NUMBER, REQUIRED_FIELD, isEmailValid, isPhoneNumberValid } from '../../../utils/forms';
import { useRegisterMutation } from '../../../redux/api';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import { useAppSelector } from '../../../redux/store';
import { Checkbox } from '../../../components/Checkbox';
import { Link } from 'react-router-dom';

interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
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

  if (!values.phoneNumber) {
    errors.phoneNumber = REQUIRED_FIELD;
  } else if (values.phoneNumber && !isPhoneNumberValid(values.phoneNumber)) {
    errors.phoneNumber = INVALID_PHONE_NUMBER;
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
  const [register, { isLoading, error }] = useRegisterMutation();
  const localCart = useAppSelector((state) => state.localCartState.items);

  const [agreed, setArgeed] = useState(true);

  const formik = useFormik<FormValues>({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
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
        phone_number: values.phoneNumber,
        cart_items: localCart.map((item) => ({
          variant: item.variantId,
          amount: item.amount,
        }))
      });

      if (!('error' in result)) {
        resetForm();
        toast('A verification email has been sent. Please verify your email!', { type: 'info', autoClose: false });
      } else {
        toast('Registration Error!', { type: 'error' });
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
      heading='Registration'
      width={600}
      link={{
        path: `${NavPaths.AUTH}/${AuthNestedPaths.LOGIN}`,
        name: 'Log in',
      }}
    >
      <form onSubmit={formik.handleSubmit} className={css.form}>
        <div className={css.row}>
          <Input
            label='First name'
            name='firstName'
            onChange={formik.handleChange}
            value={formik.values.firstName}
            isTouched={formik.touched.firstName}
            error={formik.errors.firstName}
          />

          <Input
            label='Last name'
            name='lastName'
            onChange={formik.handleChange}
            value={formik.values.lastName}
            isTouched={formik.touched.lastName}
            error={formik.errors.lastName}
          />
        </div>

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
          label='Phone number'
          name='phoneNumber'
          onChange={formik.handleChange}
          value={formik.values.phoneNumber}
          isTouched={formik.touched.phoneNumber}
          error={formik.errors.phoneNumber}
        />

        <Input
          label='Password'
          name='password1'
          type='password'
          onChange={formik.handleChange}
          value={formik.values.password1}
          isTouched={formik.touched.password1}
          error={formik.errors.password1}
        />

        <Input
          label='Password confirmation'
          name='password2'
          type='password'
          onChange={formik.handleChange}
          value={formik.values.password2}
          isTouched={formik.touched.password2}
          error={formik.errors.password2}
        />

        <Checkbox
          label={
            <span>
              I give my consent to the <Link to={PDFDocumentsPaths.DATA_PROCESSING} className='link'>processing of personal data</Link>
            </span>
          }
          checked={agreed}
          onChange={() => setArgeed((prev) => !prev)}
        />

        <Button
          type='submit'
          isLoading={isLoading}
          state={{ default: { text: 'Register', icon: undefined } }}
          disabled={!agreed}
        />
      </form>
    </ModalTemplate>
  );
}
