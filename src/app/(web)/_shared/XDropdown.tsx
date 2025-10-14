import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { Avatar } from '@mui/material';
import { getApi } from '@/lib/utils';
import { LINKS } from '@/lib/constant';
import Dropdown from '@/components/ui/Dropdown';

export default function XDropdown() {
  const t = useTranslations();
  const router = useRouter();

  const items = [
    {
      text: t('profile'),
      onClick() {
        router.push(`/${LINKS.PROFILE}`);
      },
    },
    {
      text: t('signOut'),
      async onClick() {
        const result = await getApi<boolean>('/api/auth/logout');

        if (result) {
          router.push(`/${LINKS.LOGIN}`);
        }
      },
    },
  ];

  return (
    <Dropdown items={items} closeAfterClick>
      <Avatar src="/static/images/avatar/2.jpg" />
    </Dropdown>
  );
}
