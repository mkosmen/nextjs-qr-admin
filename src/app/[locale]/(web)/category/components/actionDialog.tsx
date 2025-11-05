import { FormEvent, useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { MODAL_ACTION_TYPE } from '@/lib/constant';
import actionValidation from '@/validations/category/action';
import { Category, CategoryActionDto } from '@/lib/types';
// ---
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Switch,
} from '@mui/material';
import MhcInput from '@/components/ui/MhcInput';

interface Props {
  type: MODAL_ACTION_TYPE;
  onClose: () => void;
  onSubmit: (items: any) => void;
  setLoading: (act: boolean) => void;
  open: boolean;
  loading: boolean;
  category?: Category | null;
}

export default function ActionDialog({
  open,
  type,
  loading,
  category,
  onClose,
  onSubmit,
  setLoading,
}: Props) {
  const t = useTranslations();
  const [formItems, setFormItems] = useState<CategoryActionDto>({
    name: '',
    active: false,
  });
  const [errors, setErrors] = useState<{ name?: string[]; active?: [] }>({});

  useEffect(() => {
    setFormItems({
      name: category?.name,
      active: Boolean(category?.active),
    });
  }, [category]);

  async function onSubmitHandler(e: FormEvent<HTMLFormElement>) {
    try {
      e.preventDefault();
      setLoading(true);

      setErrors(() => ({}));

      const validationResult = await actionValidation(formItems);

      if (!validationResult.result) {
        setErrors(() => ({ ...validationResult.errors }));
        setLoading(false);
        return;
      }

      onSubmit(formItems);
    } catch {
      setLoading(false);
    }
  }

  function setFormItem(key: string, value: any) {
    setFormItems((prev) => ({
      ...prev,
      [key]: value,
    }));
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth={true} maxWidth="xs">
      <DialogTitle>{type === 'create' ? t('add') : t('update')}</DialogTitle>
      <DialogContent>
        <Box
          component="form"
          noValidate
          autoComplete="off"
          id="subscription-form"
          className="mt-2"
          onSubmit={onSubmitHandler}
        >
          <MhcInput
            id="name"
            label={t('category.name')}
            value={formItems.name}
            autoFocus
            onFocus={() => setErrors((prev) => ({ ...prev, name: undefined }))}
            onChange={(e) => setFormItem('name', e.target.value)}
            fullWidth
            errors={errors?.name}
            slotProps={{ htmlInput: { maxLength: 31 } }}
          />

          <FormControlLabel
            checked={formItems.active}
            control={<Switch onChange={(e) => setFormItem('active', e.target.checked)} />}
            label={t('active')}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={loading} color="secondary">
          {t('cancel')}
        </Button>
        <Button type="submit" form="subscription-form" loading={loading} color="primary">
          {t('submit')}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
