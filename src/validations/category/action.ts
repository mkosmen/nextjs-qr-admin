'use server';

import { CategoryActionDto } from '@/lib/types';
import { z } from 'zod';
import { getTranslations } from 'next-intl/server';

const schema = async () => {
  const t = await getTranslations();

  return z.object({
    name: z
      .string()
      .min(3, {
        message: t('validation.between', {
          field: t('category.name'),
          min: 3,
          max: 31,
        }),
      })
      .max(31, {
        message: t('validation.between', {
          field: t('category.name'),
          min: 3,
          max: 31,
        }),
      }),
  });
};

export default async function action(props: CategoryActionDto) {
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
