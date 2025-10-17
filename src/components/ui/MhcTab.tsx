'use client';

import { PropsWithChildren, SyntheticEvent, useState } from 'react';
import { Box, styled, Tab, TabProps, Tabs } from '@mui/material';
import { TabContext } from '@mui/lab';

export interface Props {
  tabs: TabProp[];
  onTabChange?: (event: SyntheticEvent, newValue: number) => void;
}

export type TabProp = { label: string };

const TabItem = styled((props: TabProps) => <Tab disableRipple {...props} />)(() => ({
  textTransform: 'none',
  minWidth: 0,
}));

export default function MhcTab({ tabs, onTabChange, children }: Props & PropsWithChildren) {
  const [activeTab, setActiveTab] = useState(0);

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
    onTabChange?.(event, newValue);
  };

  return (
    <>
      <TabContext value={activeTab}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={activeTab} onChange={handleChange}>
            {tabs.map((m, i) => {
              return <TabItem key={i} {...m} />;
            })}
          </Tabs>
        </Box>
        {children}
      </TabContext>
    </>
  );
}
