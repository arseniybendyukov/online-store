import { useFormik } from 'formik';
import css from './index.module.css';
import { Input } from '../../../components/Input';
import { useAppSelector } from '../../../redux/store';
import { useEffect } from 'react';
import { Button } from '../../../components/Button';
import { INVALID_PHONE_NUMBER, isPhoneNumberValid } from '../../../utils/forms';
import { useUpdateMeMutation } from '../../../redux/apis/authApi';
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

  if (values.phoneNumber && !isPhoneNumberValid(values.phoneNumber)) {
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

  useEffect(() => {
    if (user) {
      formik.setFieldValue('firstName', user.first_name);
      formik.setFieldValue('lastName', user.last_name);
      formik.setFieldValue('patronymic', user.patronymic ?? '');
      formik.setFieldValue('birthdate', user.birthdate ?? '');
      formik.setFieldValue('phoneNumber', user.phone_number ?? '');
    }
  }, [user]);

  return (
    <div className={css.container}>
      <h1 className='h1'>Личные данные</h1>
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

                  <Input
                    label='Отчество'
                    name='patronymic'
                    onChange={formik.handleChange}
                    value={formik.values.patronymic}
                    isTouched={formik.touched.patronymic}
                    error={formik.errors.patronymic}
                  />
                </div>
              </div>

              <Input
                label='Дата рождения'
                name='birthdate'
                type='date'
                onChange={formik.handleChange}
                value={formik.values.birthdate}
                isTouched={formik.touched.birthdate}
                error={formik.errors.birthdate}
              />

              <Input
                disabled
                label='Электронная почта'
                type='email'
                value={user.email}
              />
              
              <Input
                label='Номер телефона'
                name='phoneNumber'
                onChange={formik.handleChange}
                value={formik.values.phoneNumber}
                isTouched={formik.touched.phoneNumber}
                error={formik.errors.phoneNumber}
              />
            </div>
            <div className={css.separator}></div>
            <div className={css.orderFormSide}>
              (...)
            </div>
          </div>
          <Button
            type='submit'
            isLoading={isLoading}
            state={{ default: { text: 'Сохранить', icon: undefined } }}
          />
        </form>
      )}
    </div>
  );
}
