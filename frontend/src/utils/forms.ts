export const REQUIRED_FIELD = 'Обязательное поле!';
export const INVALID_EMAIL = 'Неправильный формат электронной почты!'

export const isEmailValid = (email: string) => (
  /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)
);

export const isPhoneNumberValid = (phoneNumber: string) => (
  // todo: найти нормальное регулярное выражение для номера телефона
  /^\+?1?\d{9,15}$/.test(phoneNumber)
);
