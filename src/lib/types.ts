export interface ILogin {
  email: string;
  password: string;
}

export interface User {
  name: string;
  surname: string;
  email: string;
}

export interface UserWithPassword extends User {
  password: string;
}
