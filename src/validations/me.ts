'use server';

import { MeUpdateDto } from '@/lib/types';
import { z } from 'zod';
import { getTranslations } from 'next-intl/server';

const schema = async () => {
  const t = await getTranslations();

  return z
    .object({
      name: z
        .string()
        .min(3, {
          message: t('validation.between', {
            field: t('name'),
            min: 3,
            max: 31,
          }),
        })
        .max(31, {
          message: t('validation.between', {
            field: t('name'),
            min: 3,
            max: 31,
          }),
        }),

      surname: z
        .string()
        .min(3, {
          message: t('validation.between', {
            field: t('surname'),
            min: 3,
            max: 31,
          }),
        })
        .max(31, {
          message: t('validation.between', {
            field: t('surname'),
            min: 3,
            max: 31,
          }),
        }),

      newPassword: z
        .string()
        .min(3, {
          message: t('validation.between', {
            field: t('newPassword'),
            min: 3,
            max: 31,
          }),
        })
        .max(31, {
          message: t('validation.between', {
            field: t('newPassword'),
            min: 3,
            max: 31,
          }),
        }),

      newPassword2: z
        .string()
        .min(3, {
          message: t('validation.between', {
            field: t('newPasswordAgain'),
            min: 3,
            max: 31,
          }),
        })
        .max(31, {
          message: t('validation.between', {
            field: t('newPasswordAgain'),
            min: 3,
            max: 31,
          }),
        }),

      password: z
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
    .refine(async (v) => v.newPassword === v.newPassword2, {
      message: t('validation.passwordRefine', {
        min: 3,
        max: 31,
      }),
    });
};

export default async function register(props: MeUpdateDto) {
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
