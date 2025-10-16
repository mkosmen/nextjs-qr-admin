'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Box, styled, Tab, Tabs } from '@mui/material';
import { TabContext, TabPanel } from '@mui/lab';
import MeForm from './components/MeForm';

export default function MePage() {
  const t = useTranslations();

  const [activeTab, setActiveTab] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  interface StyledTabProps {
    label: string;
  }

  const AntTab = styled((props: StyledTabProps) => <Tab disableRipple {...props} />)(() => ({
    textTransform: 'none',
    minWidth: 0,
  }));

  return (
    <>
      <TabContext value={activeTab}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={activeTab} onChange={handleChange}>
            <AntTab label={t('myInfo')} />
            <AntTab label={t('changePassword')} />
            <AntTab label={t('others')} />
          </Tabs>
        </Box>
        <TabPanel value={0} className="!px-0">
          <MeForm />
        </TabPanel>
        <TabPanel value={1}>Item Two</TabPanel>
        <TabPanel value={2}>Item Three</TabPanel>
      </TabContext>
    </>
  );
}
