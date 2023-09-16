export interface AccessToken {
  access: string;
}

export interface RefreshToken {
  refresh: string;
}

export interface Tokens extends AccessToken, RefreshToken {}

export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  patronymic: string | null;
  image: string | null;
  birthdate: string  | null;
  phone_number: string  | null;
}

export interface UserCounts {
  saved_products_count: number;
  cart_products_count: number;
}

export interface RegisterInput {
  email: string;
  first_name: string;
  last_name: string;
  password: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface UpdateMeInput {
  first_name: string;
  last_name: string;
  patronymic: string;
  birthdate: string;
  phone_number: string;
}

export interface ActivateEmailInput {
  uidb64: string;
  token: string;
}
