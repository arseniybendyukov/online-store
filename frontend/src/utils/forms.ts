export const REQUIRED_FIELD = 'Обязательное поле!';
export const INVALID_EMAIL = 'Неправильный формат электронной почты!'
export const INVALID_PHONE_NUMBER = 'Номер должен быть введен в формате: \'+999999999\'. Номер должен содержать не меньше 9 и не больше 15 цифр.';

export const isEmailValid = (email: string) => (
  /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)
);

export const isPhoneNumberValid = (phoneNumber: string) => (
  // todo: найти нормальное регулярное выражение для номера телефона
  /^\+?1?\d{9,15}$/.test(phoneNumber)
);
