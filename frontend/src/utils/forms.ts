export const REQUIRED_FIELD = 'Обязательное поле!';
export const INVALID_EMAIL = 'Неправильный формат электронной почты!'

export const isEmailValid = (email: string) => (
  /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)
);
