'use client';

import { useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import MeForm from './components/MeForm';
import MhcTab from '@/components/ui/MhcTab';
import { TabPanel } from '@mui/lab';
import PasswordVerifyDialog from '@/components/PasswordVerifyDialog';
import { getApi, putApi } from '@/lib/utils';
import { LINKS } from '@/lib/constant';
import { useAppDispatch, useAppStore } from '@/lib/store/hooks';
import { setUser } from '@/lib/store/reducers/usersReducer';
import { User } from '@/lib/types';
import { Alert } from '@mui/material';
import Toast from '@/components/Toast';

export default function MePage() {
  const t = useTranslations();

  const store = useAppStore();
  const dispatch = useAppDispatch();

  const updateInputs = useRef<{ name: string; surname: string } | null>(null);
  const [verifyDialogOpen, setVerifyDialogOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastOpenStatus, setToastOpenStatus] = useState(false);
  const [meUpdateError, setMeUpdateError] = useState('');
  const [meLoading, setMeLoading] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  const user = store.getState().user.user;

  const tabs = [
    {
      label: t('myInfo'),
    },
    {
      label: t('changePassword'),
    },
  ];

  async function handleVerified(status: boolean) {
    if (!status) {
      return;
    }

    try {
      const result = await putApi<{
        status: boolean;
        message?: string;
        messages?: Record<string, string[]>;
      }>(LINKS.API_ROUTE.USER.ME, {
        body: JSON.stringify(updateInputs.current),
      });

      if (result.status) {
        const me = await getApi<User>(LINKS.API_ROUTE.USER.ME);
        dispatch(setUser(me));

        setToastMessage(t('meUpdateSuccess'));
        setToastOpenStatus(true);
      } else {
        setMeUpdateError(result?.message || t('meUpdateFailed'));

        if ('messages' in result) {
          setFormErrors((prev) => ({ ...prev, ...result.messages }));
        }
      }
    } catch (error: any) {
      setMeUpdateError(error?.message || t('anErrorOccured'));
    } finally {
      setMeLoading(false);
      setVerifyDialogOpen(false);
    }
  }

  function onMeSubmitHandler(inputs: { name: string; surname: string }) {
    updateInputs.current = inputs;
    console.log('onMeSubmitHandler.updateInputs', inputs);
    setVerifyDialogOpen(true);
  }

  function onCloseHandler() {
    setVerifyDialogOpen(false);
  }

  function onCloseToast() {
    setToastOpenStatus(false);
    setToastMessage('');
  }

  return (
    <>
      <MhcTab tabs={tabs}>
        <TabPanel value={0} className="!px-0">
          <div className="max-w-sm">
            {!!meUpdateError ? (
              <Alert severity="warning" onClose={() => setMeUpdateError('')} className="mb-5">
                {meUpdateError}
              </Alert>
            ) : null}
            <MeForm
              onSubmit={onMeSubmitHandler}
              loading={meLoading}
              errors={formErrors}
              user={user!}
              isDisabled={verifyDialogOpen}
            />
          </div>
        </TabPanel>
      </MhcTab>

      <PasswordVerifyDialog
        open={verifyDialogOpen}
        onClose={onCloseHandler}
        onVerified={handleVerified}
      />

      <Toast open={toastOpenStatus} message={toastMessage} onClose={onCloseToast} />
    </>
  );
}
