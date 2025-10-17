'use client';

import { useTranslations } from 'next-intl';
import MeForm from './components/MeForm';
import MhcTab from '@/components/ui/MhcTab';
import { TabPanel } from '@mui/lab';

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

  return (
    <>
      <MhcTab tabs={tabs}>
        <TabPanel value={0} className="!px-0">
          <MeForm />
        </TabPanel>
      </MhcTab>
    </>
  );
}
