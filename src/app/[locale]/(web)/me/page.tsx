'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import MhcTab from '@/components/ui/MhcTab';
import { TabPanel } from '@mui/lab';
import PasswordVerifyDialog from '@/components/PasswordVerifyDialog';
import { useAppStore } from '@/lib/store/hooks';
import MeTab from './tabs/me';

export default function MePage() {
  const t = useTranslations();
  const store = useAppStore();
  const user = store.getState().user.user;

  const [verifyDialogStatus, setVerifyDialogStatus] = useState(false);
  const [verify, setVerify] = useState(false);

  const tabs = [
    {
      label: t('myInfo'),
    },
    {
      label: t('changePassword'),
    },
  ];

  function onDoneHandler() {
    setVerifyDialogStatus(false);
    setVerify(false);
  }

  return (
    <>
      <MhcTab tabs={tabs}>
        <TabPanel value={0} className="!px-0">
          <MeTab
            user={user!}
            isDisabled={verifyDialogStatus}
            setVerifyDialogStatus={setVerifyDialogStatus}
            onDone={onDoneHandler}
            verify={verify}
          />
        </TabPanel>
        <TabPanel value={1} className="!px-0"></TabPanel>
      </MhcTab>

      <PasswordVerifyDialog
        open={verifyDialogStatus}
        onClose={() => setVerifyDialogStatus(false)}
        onVerified={setVerify}
      />
    </>
  );
}
