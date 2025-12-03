'use server';

import { LINKS } from '../constant';
import { getRequest, postRequest } from '../request';
import { SigInResponse, SignInDto, SignUpDto } from '../types';
import { removeToken, setToken } from './token.service';

export const login = async (data: SignInDto) => {
  try {
    const result = await postRequest<SigInResponse>(LINKS.REST_API.AUTH.LOGIN, { data });
    await setToken(result.token!);

    return result;
  } catch (error) {
    return { error };
  }
};

export const logout = async () => {
  await getRequest(LINKS.REST_API.AUTH.LOGOUT);
  await removeToken();
};

export const signUp = async (data: SignUpDto) =>
  await postRequest(LINKS.REST_API.AUTH.SIGNUP, { data });
