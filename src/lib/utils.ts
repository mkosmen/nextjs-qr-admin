import { PUBLIC_ROUTES } from '@/lib/constant';
import CustomError from './errors/CustomError';

export const sleep = (time = 1000) => new Promise((r) => setTimeout(r, time));

export const isPublicRoute = (path: string, locale: string) =>
  PUBLIC_ROUTES.some((p) => path.replace(`/${locale}`, '').startsWith(p));

export const handleErrorIfy = (content: any) => {
  if (!('error' in content)) {
    return content;
  }

  throw new CustomError(content);
};
