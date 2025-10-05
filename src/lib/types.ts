export interface SigIn {
  email: string;
  password: string;
}

export interface SigInResponse {
  message?: string;
  token?: string;
}

export interface User {
  name: string;
  surname: string;
  email: string;
  password: string;
}
