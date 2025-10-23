'use server';

import { z } from 'zod';
import { getTranslations } from 'next-intl/server';

const schema = async () => {
  const t = await getTranslations();

  return z.object({
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
  });
};

export default async function register(password: string) {
  const result = (await schema()).safeParse({ password });

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
