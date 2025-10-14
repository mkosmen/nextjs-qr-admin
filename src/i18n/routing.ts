import { DEFAULT_LOCALE, LOCALES } from '@/lib/constant';
import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: LOCALES,
  defaultLocale: DEFAULT_LOCALE,
});
