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
  patronymic: string;
  image: string;
  birthdate: string;
  phone_number: string;
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

export interface UserWithTokens extends User {
  tokens: Tokens;
}
