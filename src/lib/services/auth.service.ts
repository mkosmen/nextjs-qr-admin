import { LINKS } from '../constant';
import { getRequest } from '../request';
import { User } from '../types';

export async function getMe() {
  return await getRequest<User>(LINKS.API.AUTH.ME);
}
