import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';

export default function NotFoundPage() {
  const locale = useLocale();
  const t = useTranslations('NotFoundPage');
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center bg-black text-white">
      <p className="mb-4 flex items-center justify-center gap-4 text-lg">
        <span>404</span>
        <span className="h-8 w-[1px] bg-white"></span>
        <h1>{t('title')}</h1>
      </p>
      <p>
        <Link className="underline" href={`/${locale}/login`}>
          {t('login')}
        </Link>
      </p>
    </div>
  );
}
