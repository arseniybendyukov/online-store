import { useFormik } from 'formik';
import css from './index.module.css';
import { INVALID_PHONE_NUMBER, REQUIRED_FIELD, isPhoneNumberValid } from '../../../utils/forms';
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
  phoneNumber: string;
  text: string;
}

function validate(values: FormValues) {
  const errors: Partial<FormValues> = {};

  if (!values.fullName) {
    errors.fullName = REQUIRED_FIELD;
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
      phoneNumber: '',
      text: '',
    },
    validate,
    onSubmit: async (values) => {
      const result = await createAppeal({
        full_name: values.fullName,
        phone_number: values.phoneNumber,
        text: values.text,
      });

      if ('error' in result) {
        toast('An error occurred!', { type: 'error' });
      } else {
        toast('Your request has been submitted!', { type: 'success' });
      }
    },
  });

  const setFieldValue = formik.setFieldValue;

  useEffect(() => {
    if (user) {
      setFieldValue('fullName', getFullName(user));
      setFieldValue('phoneNumber', user.phone_number ?? '');
    }
  }, [user, setFieldValue]);

  return (
    <form onSubmit={formik.handleSubmit} className={css.form}>
      <Input
        label='Full name'
        name='fullName'
        onChange={formik.handleChange}
        value={formik.values.fullName}
        isTouched={formik.touched.fullName}
        error={formik.errors.fullName}
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
        label='Message'
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
            I give my consent to <Link to={PDFDocumentsPaths.DATA_PROCESSING} className='link'>the processing of personal data</Link>
          </span>
        }
        checked={agreed}
        onChange={() => setArgeed((prev) => !prev)}
      />

      <Button
        type='submit'
        isLoading={isLoading}
        state={{ default: { text: 'Submit', icon: undefined } }}
        disabled={!agreed}
      />
    </form>
  );
}
