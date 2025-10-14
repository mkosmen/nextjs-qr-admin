import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/navigation';
import { Avatar } from '@mui/material';
import { getApi } from '@/lib/utils';
import { API_LINKS, LINKS } from '@/lib/constant';
import Dropdown from '@/components/ui/Dropdown';

export default function XDropdown() {
  const t = useTranslations();
  const router = useRouter();

  const items = [
    {
      text: t('profile'),
      href: LINKS.PROFILE,
    },
    {
      text: t('signOut'),
      async onClick() {
        const result = await getApi<boolean>(API_LINKS.USER.LOGOUT);

        if (result) {
          router.push(LINKS.LOGIN);
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
