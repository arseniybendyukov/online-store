import { useEffect, useState } from 'react';
import { INVALID_EMAIL, REQUIRED_FIELD, isEmailValid } from '../../../utils/forms';
import { ModalTemplate } from '../ModalTemplate';
import css from './index.module.css';
import { useFormik } from 'formik';
import { Input } from '../../../components/Input';
import { Button } from '../../../components/Button';
import { useResendActivationMutation } from '../../../redux/api';
import { toast } from 'react-toastify';

interface FormValues {
  email: string;
}

function validate(values: FormValues) {
  const errors: Partial<FormValues> = {};

  if (!values.email) {
    errors.email = REQUIRED_FIELD;
  } else if (!isEmailValid(values.email)) {
    errors.email = INVALID_EMAIL;
  }

  return errors;
}

export function EmailResend() {
  const [resendActivation, { isLoading, error }] = useResendActivationMutation();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const formik = useFormik<FormValues>({
    initialValues: {
      email: '',
    },
    validate,
    onSubmit: async (values) => {
      const result = await resendActivation({
        email: values.email,
      });

      if (!('error' in result)) {
        setIsSubmitted(true);
      } else {
        toast('An error occured!', { type: 'error' });
      }
    }
  });

  const setFieldError = formik.setFieldError;

  useEffect(() => {
    if (error && 'status' in error) {
      if (error.status === 404) {
        setFieldError(
          'email',
          'No user found with this email address',
        );
      }
    }
  }, [error, setFieldError]);

  return (
    <ModalTemplate
      heading='Verify Your Email'
      width={650}
    >
      {
        !isSubmitted
        ? (
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
            
            <Button
              type='submit'
              isLoading={isLoading}
              state={{ default: { text: 'Submit', icon: undefined } }}
            />
          </form>
        )
        : (
          <div className={css.container}>
            <p className={css.success}>Email successfully sent!</p>
            <p>({formik.values.email})</p>
          </div>
        )
      }
    </ModalTemplate>
  );
}
