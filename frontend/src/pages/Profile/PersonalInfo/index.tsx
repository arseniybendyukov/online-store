import { useFormik } from 'formik';
import css from './index.module.css';
import { Input } from '../../../components/Input';
import { useAppSelector } from '../../../redux/store';
import { useEffect } from 'react';
import { Button } from '../../../components/Button';
import { INVALID_PHONE_NUMBER, REQUIRED_FIELD, isPhoneNumberValid } from '../../../utils/forms';
import { useUpdateMeMutation } from '../../../redux/api';
import { Avatar } from './Avatar';

interface FormValues {
  firstName: string;
  lastName: string;
  patronymic: string;
  birthdate: string;
  phoneNumber: string;
}

function validate(values: FormValues) {
  const errors: Partial<FormValues> = {};

  if (!values.phoneNumber) {
    errors.phoneNumber = REQUIRED_FIELD;
  } else if (values.phoneNumber && !isPhoneNumberValid(values.phoneNumber)) {
    errors.phoneNumber = INVALID_PHONE_NUMBER;
  }

  return errors;
}

export function PersonalInfo() {
  const user = useAppSelector((state) => state.userState.user);
  const [updateMe, { isLoading }] = useUpdateMeMutation();

  const formik = useFormik<FormValues>({
    initialValues: {
      firstName: '',
      lastName: '',
      patronymic: '',
      birthdate: '',
      phoneNumber: '',
    },
    validate,
    onSubmit: (values) => {
      updateMe({
        first_name: values.firstName,
        last_name: values.lastName,
        patronymic: values.patronymic,
        birthdate: values.birthdate,
        phone_number: values.phoneNumber,
      });
    },
  });

  const setFieldValue = formik.setFieldValue;

  useEffect(() => {
    if (user) {
      setFieldValue('firstName', user.first_name);
      setFieldValue('lastName', user.last_name);
      setFieldValue('patronymic', user.patronymic ?? '');
      setFieldValue('birthdate', user.birthdate ?? '');
      setFieldValue('phoneNumber', user.phone_number);
    }
  }, [user, setFieldValue]);

  return (
    <div className={css.container}>
      <h1 className='h1'>Personal Information</h1>
      {user && (
        <form onSubmit={formik.handleSubmit} className={css.form}>
          <div className={css.formTemplate}>
            <div className={css.mainFormSide}>
              <div className={css.identityInfo}>
                <Avatar
                  initials={user.first_name[0] + user.last_name[0]}
                  color={user.color}
                  image={user.image}
                />

                <div className={css.nameInputs}>
                  <Input
                    label='Name'
                    name='firstName'
                    onChange={formik.handleChange}
                    value={formik.values.firstName}
                    isTouched={formik.touched.firstName}
                    error={formik.errors.firstName}
                  />

                  <Input
                    label='Surname'
                    name='lastName'
                    onChange={formik.handleChange}
                    value={formik.values.lastName}
                    isTouched={formik.touched.lastName}
                    error={formik.errors.lastName}
                  />

                  <Input
                    label='Patronymic'
                    name='patronymic'
                    onChange={formik.handleChange}
                    value={formik.values.patronymic}
                    isTouched={formik.touched.patronymic}
                    error={formik.errors.patronymic}
                  />
                </div>
              </div>

              <Input
                label='Birthdate'
                name='birthdate'
                type='date'
                onChange={formik.handleChange}
                value={formik.values.birthdate}
                isTouched={formik.touched.birthdate}
                error={formik.errors.birthdate}
              />

              <Input
                disabled
                label='Email'
                type='email'
                value={user.email}
              />
              
              <Input
                label='Phone number'
                name='phoneNumber'
                onChange={formik.handleChange}
                value={formik.values.phoneNumber}
                isTouched={formik.touched.phoneNumber}
                error={formik.errors.phoneNumber}
              />
            </div>
          </div>
          <Button
            type='submit'
            isLoading={isLoading}
            state={{ default: { text: 'Save', icon: undefined } }}
          />
        </form>
      )}
    </div>
  );
}
