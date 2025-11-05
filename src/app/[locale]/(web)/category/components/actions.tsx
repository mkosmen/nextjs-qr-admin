import { useTranslations } from 'next-intl';
import { Button } from '@mui/material';
import { Add, Refresh } from '@mui/icons-material';

interface Props {
  loading: boolean;
  openActionDialog: () => void;
  refresh: () => void;
}

export default function Actions({ loading, openActionDialog, refresh }: Props) {
  const t = useTranslations();

  return (
    <div className="flex gap-2">
      <Button
        component="label"
        role={undefined}
        variant="contained"
        tabIndex={-1}
        startIcon={<Add />}
        loading={loading}
        onClick={openActionDialog}
      >
        {t('add')}
      </Button>
      <Button
        component="label"
        role={undefined}
        variant="contained"
        tabIndex={-1}
        startIcon={<Refresh />}
        loading={loading}
        onClick={refresh}
      >
        {t('refresh')}
      </Button>
    </div>
  );
}
