'use client';

import { useContext, useState } from 'react';
import { useTranslations } from 'next-intl';
import { useAppStore } from '@/lib/store/hooks';
import { CommonContext } from '@/lib/providers/CommonProvider';
import MhcTab, { TabPanel } from '@/components/ui/MhcTab';
import MeTab from './tabs/me';
import PasswordTab from './tabs/password';

export default function MePage() {
  const t = useTranslations();
  const tabs = [
    {
      label: t('myInfo'),
    },
    {
      label: t('changePassword'),
    },
  ];

  const store = useAppStore();
  const user = store.getState().user.user;
  const commonProvider = useContext(CommonContext);
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [verify, setVerify] = useState(false);

  function onDoneHandler() {
    commonProvider?.setVerifyPasswordDialogStatus(false);
    setVerify(false);
  }

  return (
    <MhcTab tabs={tabs} onTabChange={(e, v) => setActiveTabIndex(v)}>
      <TabPanel value={0} className="!px-0">
        <MeTab
          user={user!}
          onSubmit={() => commonProvider?.setVerifyPasswordDialogStatus(true)}
          verify={activeTabIndex === 0 && verify}
          onComplete={onDoneHandler}
        />
      </TabPanel>
      <TabPanel value={1} className="!px-0">
        <PasswordTab
          onSubmit={() => commonProvider?.setVerifyPasswordDialogStatus(true)}
          verify={activeTabIndex === 1 && verify}
          onComplete={onDoneHandler}
        />
      </TabPanel>
    </MhcTab>
  );
}
