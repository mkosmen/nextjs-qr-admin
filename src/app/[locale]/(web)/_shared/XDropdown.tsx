import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/navigation';
import { Avatar } from '@mui/material';
import { getApi } from '@/lib/utils';
import { LINKS } from '@/lib/constant';
import Dropdown from '@/components/ui/Dropdown';
import { User } from '@/lib/types';

export default function XDropdown({ user }: { user: User }) {
  const t = useTranslations();
  const router = useRouter();

  const items = [
    {
      text: t('profile'),
      href: LINKS.WEB.PROFILE,
    },
    {
      text: t('signOut'),
      async onClick() {
        const result = await getApi<boolean>(LINKS.API_ROUTE.AUTH.LOGOUT);

        if (result) {
          router.push(LINKS.WEB.LOGIN);
        }
      },
    },
  ];

  return (
    <Dropdown items={items} closeAfterClick>
      <Avatar>{user.name[0]}</Avatar>
    </Dropdown>
  );
}
