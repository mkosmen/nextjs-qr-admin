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

export type MeUpdateDto = Partial<Omit<SignUpDto, 'email'>>;

export interface PasswordUpdateDto {
  newPassword: string;
  newPasswordAgain: string;
}

export interface Category {
  _id?: string;
  name: string;
  userId: string;
  active?: boolean;
  slug?: string;
}

export interface DefaultOptions {
  _id: string;
  statusLoading: boolean;
}

export interface PaginationModel {
  page: number;
  pageSize: number;
}

export interface PaginationLimitModel {
  maxPage: number;
  total: number;
}

export type Pagination = PaginationModel & PaginationLimitModel;

export type PaginationResult<T extends object> = T & {
  pagination: {
    page: number;
    limit: number;
    maxPage: number;
    total: number;
  };
};

export type CategoryActionDto = Partial<Pick<Category, 'name' | 'active'>>;

export type DialogCloseReason = 'backdropClick' | 'escapeKeyDown';

export interface Product {
  _id?: string;
  name?: string;
  categoryId?: string;
  active?: boolean;
}

export type ProductActionDto = Partial<Pick<Product, 'name' | 'active'>>;
