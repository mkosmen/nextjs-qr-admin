'use client';

import { useState, MouseEvent, PropsWithChildren } from 'react';
import { Box, Button, Menu, MenuItem, Typography } from '@mui/material';
import { Link } from '@/i18n/navigation';

export interface Item {
  text: string;
  href?: string;
  onClick?: () => void;
}

export interface Props {
  closeAfterClick?: boolean;
  items: Item[];
}

export default function XDropdown(props: Props & PropsWithChildren) {
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  function handleOpenUserMenu(event: MouseEvent<HTMLElement>) {
    setAnchorElUser(event.currentTarget);
  }

  function handleCloseUserMenu() {
    setAnchorElUser(null);
  }

  function onClickHandler(item: Item) {
    item?.onClick?.();

    if (props.closeAfterClick) {
      handleCloseUserMenu();
    }
  }

  return (
    <Box sx={{ flexGrow: 0 }}>
      <Button onClick={handleOpenUserMenu} className="!min-w-0 !p-0 !leading-none">
        {props.children}
      </Button>
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
        {props.items.map((item, i) => (
          <MenuItem key={i} onClick={() => onClickHandler(item)}>
            {item.href ? (
              <Link href={item.href}>
                <Typography sx={{ textAlign: 'center' }}>{item.text}</Typography>
              </Link>
            ) : (
              <Typography sx={{ textAlign: 'center' }}>{item.text}</Typography>
            )}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
}
