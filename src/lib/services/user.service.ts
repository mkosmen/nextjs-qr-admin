'use server';

import { LINKS } from '../constant';
import { getRequest, postRequest, putRequest } from '../request';
import { MeUpdateDto, PasswordUpdateDto, User } from '../types';

export const me = async () => await getRequest<User>(LINKS.REST_API.USER.ME);

export const updateMe = async (data: MeUpdateDto) =>
  await putRequest<boolean>(LINKS.REST_API.USER.ME, { data });

export const passwordReset = async (data: PasswordUpdateDto) =>
  await putRequest<User>(LINKS.REST_API.USER.PASSWORD.RESET, { data });

export const passwordVerify = async (password: string) =>
  await postRequest<boolean>(LINKS.REST_API.USER.PASSWORD.VERIFY, { password });
