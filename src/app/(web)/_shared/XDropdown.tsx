import { useState, MouseEvent } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { Box, IconButton, Avatar, Menu, MenuItem, Typography } from '@mui/material';
import { getApi } from '@/lib/utils';
import { LINKS } from '@/lib/constant';

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
        handleCloseUserMenu();

        const result = await getApi<boolean>('/api/auth/logout');

        if (result) {
          router.push(`/${LINKS.LOGIN}`);
        }
      },
    },
  ];

  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <Box sx={{ flexGrow: 0 }}>
      <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
        <Avatar src="/static/images/avatar/2.jpg" />
      </IconButton>
      <Menu
        sx={{ mt: '30px' }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        {items.map((item, i) => (
          <MenuItem key={i} onClick={item.onClick}>
            <Typography sx={{ textAlign: 'center' }}>{item.text}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
}
