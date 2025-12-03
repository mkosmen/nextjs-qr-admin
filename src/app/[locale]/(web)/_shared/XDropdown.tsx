import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/navigation';
import { Avatar } from '@mui/material';
import { LINKS } from '@/lib/constant';
import { User } from '@/lib/types';
import { logout } from '@/lib/services/auth.service';
import Dropdown from '@/components/ui/Dropdown';

export default function XDropdown({ user }: { user: User }) {
  const t = useTranslations();
  const router = useRouter();
  const fullName = `${user.name} ${user.surname}`;

  const items = [
    {
      text: t('profile'),
      href: LINKS.WEB.PROFILE,
    },
    {
      text: t('signOut'),
      async onClick() {
        try {
          await logout();
        } finally {
          router.push(LINKS.WEB.LOGIN);
        }
      },
    },
  ];

  return (
    <Dropdown items={items} closeAfterClick>
      <span className="flex items-center gap-1 overflow-hidden rounded-full bg-gray-200 p-1">
        <Avatar sx={{ width: 24, height: 24, bgcolor: 'gray', fontSize: 'medium' }}>
          {user.name[0]}
        </Avatar>
        <span className="text-xs text-gray-500">{fullName}</span>
      </span>
    </Dropdown>
  );
}
