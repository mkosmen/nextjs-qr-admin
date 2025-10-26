import { ReactElement } from 'react';
import { getTranslations } from 'next-intl/server';

type Props = {
  children: ReactElement;
};

export async function generateMetadata({ params }: any) {
  const { locale } = await params;
  const t = await getTranslations({ locale });

  return {
    title: t('categories'),
  };
}

export default function RootLayout({ children }: Props) {
  return children;
}
