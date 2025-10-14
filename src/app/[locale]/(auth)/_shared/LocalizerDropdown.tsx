'use client';

import Dropdown, { Item } from '@/components/ui/Dropdown';
import { LOCALES } from '@/lib/constant';
import { useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/navigation';

export default function LocalizerDropdown() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const items: Item[] = LOCALES.map((m) => {
    return {
      text: m.toUpperCase(),
      onClick: () => onSelectChange(m),
    };
  });

  function onSelectChange(locale: string) {
    router.replace(pathname, { locale });
  }

  return (
    <Dropdown items={items}>
      <span className="p-2">{locale}</span>
    </Dropdown>
  );
}
