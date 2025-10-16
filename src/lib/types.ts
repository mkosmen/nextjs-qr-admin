export interface SignInDto {
  email: string;
  password: string;
}

export interface SigInResponse {
  message?: string;
  token?: string;
}

export interface SignUpDto {
  name: string;
  surname: string;
  email: string;
  password: string;
}

export interface ResultResponse {
  result: boolean;
}

export interface User {
  name: string;
  surname: string;
  email: string;
}
