'use server';

import { PasswordUpdateDto } from '@/lib/types';
import { z } from 'zod';
import { getTranslations } from 'next-intl/server';

const schema = async () => {
  const t = await getTranslations();

  return z
    .object({
      newPassword: z
        .string()
        .min(3, {
          message: t('validation.between', {
            field: t('password'),
            min: 3,
            max: 31,
          }),
        })
        .max(31, {
          message: t('validation.between', {
            field: t('password'),
            min: 3,
            max: 31,
          }),
        }),
      newPasswordAgain: z
        .string()
        .min(3, {
          message: t('validation.between', {
            field: t('password'),
            min: 3,
            max: 31,
          }),
        })
        .max(31, {
          message: t('validation.between', {
            field: t('password'),
            min: 3,
            max: 31,
          }),
        }),
    })
    .refine((data) => data.newPassword === data.newPasswordAgain, {
      message: t('validation.passwordRefine'),
      path: ['newPasswordAgain'],
    });
};

export default async function register(props: PasswordUpdateDto) {
  const result = (await schema()).safeParse(props);

  if (!result.success) {
    return {
      result: false,
      errors: z.flattenError(result.error).fieldErrors,
    };
  }

  return {
    result: true,
  };
}
