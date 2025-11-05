import { FormEvent, useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { MODAL_ACTION_TYPE } from '@/lib/constant';
import actionValidation from '@/validations/product/action';
import { Category, Product } from '@/lib/types';
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
import MhcSelect from '@/components/ui/MhcSelect';

interface Props {
  type: MODAL_ACTION_TYPE;
  onClose: () => void;
  onSubmit: (items: any) => void;
  setLoading: (act: boolean) => void;
  open: boolean;
  loading: boolean;
  product?: Product | null;
  categories: Category[];
}

const DEFAULT_STATE = {
  name: '',
  categoryId: '',
  active: true,
};

export default function ActionDialog({
  open,
  type,
  loading,
  product,
  categories,
  onClose,
  onSubmit,
  setLoading,
}: Props) {
  const t = useTranslations();
  const [formItems, setFormItems] = useState<Product>(DEFAULT_STATE);
  const [errors, setErrors] = useState<{ name?: string[]; categoryId?: string[]; active?: [] }>({});

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

  function onClearHandle() {
    setErrors((prev) => ({ ...prev, name: undefined }));
    setFormItem('categoryId', '');
  }

  function onCloseHandler() {
    setFormItems(DEFAULT_STATE);
    onClose();
  }

  useEffect(() => {
    setFormItems({
      name: product?.name || '',
      categoryId: product?.categoryId || '',
      active: Boolean(product?.active),
    });
  }, [product]);

  return (
    <Dialog open={open} onClose={onCloseHandler} fullWidth={true} maxWidth="xs">
      <DialogTitle>{type === 'create' ? t('add') : t('update')}</DialogTitle>
      <DialogContent>
        <Box
          component="form"
          noValidate
          autoComplete="off"
          id="subscription-form"
          className="mt-2 flex flex-col gap-3"
          onSubmit={onSubmitHandler}
        >
          <MhcInput
            id="name"
            label={t('product.name')}
            value={formItems.name}
            autoFocus
            onFocus={() => setErrors((prev) => ({ ...prev, name: undefined }))}
            onChange={(e) => setFormItem('name', e.target.value)}
            fullWidth
            errors={errors?.name}
            slotProps={{ htmlInput: { maxLength: 31 } }}
          />

          <MhcSelect
            id="categoryId"
            label={t('category.name')}
            value={formItems.categoryId}
            errors={errors?.categoryId}
            items={categories}
            keyId="_id"
            labelId="name"
            valueId="_id"
            onFocus={() => setErrors((prev) => ({ ...prev, categoryId: undefined }))}
            onChange={(e) => setFormItem('categoryId', e.target.value)}
            onClear={onClearHandle}
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
