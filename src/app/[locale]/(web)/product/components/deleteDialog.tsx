import { Product, DialogCloseReason } from '@/lib/types';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { useTranslations } from 'next-intl';

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: () => void;
  product?: Product | null;
  loading: boolean;
}

export default function DeleteDialog({ open, product, loading, onClose, onSubmit }: Props) {
  const t = useTranslations();

  const handleClose = (event: object, reason: DialogCloseReason) => {
    if (loading || (reason && reason === 'backdropClick')) return;
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      maxWidth="xs"
    >
      <DialogTitle id="alert-dialog-title">{t('product.deleteDialogTitle')}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          <span
            dangerouslySetInnerHTML={{
              __html: t.markup('product.deleteDialogContent', {
                important: () => `<b>${product?.name}</b>`,
              }),
            }}
          ></span>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={loading}>
          {t('cancel')}
        </Button>
        <Button onClick={onSubmit} color="error" loading={loading}>
          {t('continue')}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
