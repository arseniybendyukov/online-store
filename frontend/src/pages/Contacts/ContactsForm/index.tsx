import { useFormik } from 'formik';
import css from './index.module.css';
import { INVALID_EMAIL, INVALID_PHONE_NUMBER, REQUIRED_FIELD, isEmailValid, isPhoneNumberValid } from '../../../utils/forms';
import { useAppSelector } from '../../../redux/store';
import { useEffect, useState } from 'react';
import { getFullName } from '../../../utils/data';
import { Input } from '../../../components/Input';
import { Button } from '../../../components/Button';
import { useCreateAppealMutation } from '../../../redux/api';
import { toast } from 'react-toastify';
import { Checkbox } from '../../../components/Checkbox';
import { Link } from 'react-router-dom';
import { PDFDocumentsPaths } from '../../../navigation';

interface FormValues {
  fullName: string;
  email: string;
  phoneNumber: string;
  text: string;
}

function validate(values: FormValues) {
  const errors: Partial<FormValues> = {};

  if (!values.fullName) {
    errors.fullName = REQUIRED_FIELD;
  }

  if (!values.email) {
    errors.email = REQUIRED_FIELD;
  } else if (!isEmailValid(values.email)) {
    errors.email = INVALID_EMAIL;
  }

  if (values.phoneNumber && !isPhoneNumberValid(values.phoneNumber)) {
    errors.phoneNumber = INVALID_PHONE_NUMBER;
  }

  if (!values.text) {
    errors.text = REQUIRED_FIELD;
  }

  return errors;
}

export function ContactsForm() {
  const user = useAppSelector((state) => state.userState.user);
  const [createAppeal, { isLoading }] = useCreateAppealMutation();

  const [agreed, setArgeed] = useState(true);
  
  const formik = useFormik<FormValues>({
    initialValues: {
      fullName: '',
      email: '',
      phoneNumber: '',
      text: '',
    },
    validate,
    onSubmit: async (values) => {
      const result = await createAppeal({
        full_name: values.fullName,
        email: values.email,
        phone_number: values.phoneNumber,
        text: values.text,
      });

      if ('error' in result) {
        toast('Произошла ошибка отправки обращения!', { type: 'error' });
      } else {
        toast('Ваше обращение отправлено!', { type: 'success' });
      }
    },
  });

  useEffect(() => {
    if (user) {
      formik.setFieldValue('fullName', getFullName(user));
      formik.setFieldValue('email', user.email);
      formik.setFieldValue('phoneNumber', user.phone_number ?? '');
    }
  }, [user]);

  return (
    <form onSubmit={formik.handleSubmit} className={css.form}>
      <Input
        label='Полное имя'
        name='fullName'
        onChange={formik.handleChange}
        value={formik.values.fullName}
        isTouched={formik.touched.fullName}
        error={formik.errors.fullName}
      />

      <Input
        label='Электронная почта'
        name='email'
        onChange={formik.handleChange}
        value={formik.values.email}
        isTouched={formik.touched.email}
        error={formik.errors.email}
      />

      <Input
        label='Номер телефона'
        name='phoneNumber'
        onChange={formik.handleChange}
        value={formik.values.phoneNumber}
        isTouched={formik.touched.phoneNumber}
        error={formik.errors.phoneNumber}
      />

      <Input
        label='Текст сообщения'
        name='text'
        identity='textarea'
        rows={5}
        onChange={formik.handleChange}
        value={formik.values.text}
        isTouched={formik.touched.text}
        error={formik.errors.text}
      />

      <Checkbox
        label={
          <span>
            Я даю согласие на <Link to={PDFDocumentsPaths.DATA_PROCESSING} className='link'>обработку персональных данных</Link>
          </span>
        }
        checked={agreed}
        onChange={() => setArgeed((prev) => !prev)}
      />

      <Button
        type='submit'
        isLoading={isLoading}
        state={{ default: { text: 'Отправить сообщение', icon: undefined } }}
        disabled={!agreed}
      />
    </form>
  );
}
