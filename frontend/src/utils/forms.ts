export const REQUIRED_FIELD = 'Required field!';
export const INVALID_EMAIL = 'Invalid email format!'
export const INVALID_PHONE_NUMBER = 'The phone number must be entered in the format: \'+999999999\'. It must contain between 9 and 15 digits.';

export const isEmailValid = (email: string) => (
  /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)
);

export const isPhoneNumberValid = (phoneNumber: string) => (
  /^\+?1?\d{9,15}$/.test(phoneNumber)
);
