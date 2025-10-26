import { Fragment, ReactNode, useState } from 'react';
import { useTranslations } from 'next-intl';
import classnames from 'classnames';
import { Link, usePathname } from '@/i18n/navigation';
import { LINKS } from '@/lib/constant';

import {
  Home,
  Category,
  Store,
  KeyboardDoubleArrowLeft,
  KeyboardDoubleArrowRight,
} from '@mui/icons-material';
import { Collapse, Divider, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';

interface NavItem {
  primary: string;
  href?: string;
  icon?: ReactNode;
  active?: boolean;
  divider?: boolean;
  mini?: boolean;
}
interface Nav extends NavItem {
  id: string;
  mini?: boolean;
  open?: boolean;
  children?: NavItem[];
}

function NavItemContent({ icon, primary, mini }: NavItem) {
  return (
    <div
      className={classnames('flex items-center !leading-none', {
        'flex-col !items-center !justify-center gap-1': mini,
        '!h-6 gap-2': !mini,
      })}
    >
      <ListItemIcon className="!min-w-auto">{icon}</ListItemIcon>
      <ListItemText
        primary={primary}
        className={classnames(
          'nav-item-content-text !m-0 flex-1 !text-nowrap [&_span]:!leading-[2]',
          {
            '[&_span]:!text-[10px]': mini,
            '!h-6 [&_span]:!text-[14px]': !mini,
          },
        )}
      />
    </div>
  );
}

function NavItem(props: NavItem) {
  const { href, active, ...others } = props;

  return (
    <ListItemButton
      className={classnames('!p-0', {
        '!text-white [&_svg]:!fill-white': active,
        'group !text-gray-600 hover:!text-gray-500 [&_svg]:!fill-gray-600': !active,
      })}
    >
      {href ? (
        <Link href={href} className="block w-full p-3 group-hover:[&_svg]:!fill-gray-500">
          <NavItemContent {...others} />
        </Link>
      ) : (
        <div className="w-full p-3">
          <NavItemContent {...others} />
        </div>
      )}
    </ListItemButton>
  );
}

function Nav(props: Nav) {
  const { open, children, id, ...others } = props;

  return (
    <>
      {children?.length ? (
        <>
          <NavItem key={id + '_0'} {...others} />
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {children?.map((m, i) => {
                return <NavItem {...m} key={id + '_' + (i + 1)} />;
              })}
            </List>
          </Collapse>
        </>
      ) : (
        <NavItem key={id + '_0'} {...others} />
      )}
    </>
  );
}

export default function XSideBar() {
  const t = useTranslations();
  const pathName = usePathname();
  const [mini, setMini] = useState(true);

  const items: Nav[] = [
    {
      id: 'dashboard',
      primary: t('dashboard'),
      href: LINKS.WEB.DASHBOARD,
      icon: <Home />,
      divider: true,
    },
    {
      id: 'company',
      primary: t('companies'),
      href: LINKS.WEB.COMPANY,
      icon: <Store />,
    },
    {
      id: 'categories',
      primary: t('categories'),
      href: LINKS.WEB.CATEGORY,
      icon: <Category />,
    },
    {
      id: 'products',
      primary: t('products'),
      href: LINKS.WEB.PRODUCT,
      icon: <Store />,
    },
  ];

  return (
    <div
      className={classnames('flex h-full flex-col bg-(--bg-color-dark)', {
        mini,
        'w-68 min-w-68': !mini,
        'w-16 min-w-16': mini,
      })}
    >
      <List sx={{ width: '100%' }} component="nav" className="flex-1 !py-0">
        {items.map((m) => {
          return (
            <Fragment key={m.id}>
              <Nav {...m} active={pathName === `/${m.href}`} mini={mini} />
              {m.divider && <Divider className="!border-gray-600" />}
            </Fragment>
          );
        })}
      </List>
      <Divider className="!border-gray-600" />
      <div
        className={classnames('px-4 py-2 text-white', {
          'text-right': !mini,
          'text-center': mini,
        })}
      >
        {mini ? (
          <KeyboardDoubleArrowRight className="cursor-pointer" onClick={() => setMini((p) => !p)} />
        ) : (
          <KeyboardDoubleArrowLeft className="cursor-pointer" onClick={() => setMini((p) => !p)} />
        )}
      </div>
    </div>
  );
}
