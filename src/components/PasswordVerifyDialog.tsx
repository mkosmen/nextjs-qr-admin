import { FormEvent, useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import passwordVerifyValidation from '@/validations/passwordVerify';

import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import MhcPassword from './ui/MhcPassword';
import { handleErrorIfy } from '@/lib/utils';
import { passwordVerify } from '@/lib/services/user.service';
import CustomError from '@/lib/errors/CustomError';

interface Props {
  open: boolean;
  onClose: (status: boolean) => void;
  onComplete: (status: boolean) => void;
}

export default function PasswordVerifyDialog({ open, onClose, onComplete }: Props) {
  const t = useTranslations();

  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<string[]>();

  useEffect(() => {
    return () => {
      setErrors(undefined);
      setPassword('');
    };
  }, [open]);

  async function onSubmitHandler(e: FormEvent<HTMLFormElement>) {
    try {
      e.preventDefault();

      setLoading(true);
      setErrors(undefined);

      const validationResult = await passwordVerifyValidation(password);

      if (!validationResult.result) {
        setLoading(false);
        setErrors(validationResult.errors?.password);

        return;
      }

      handleErrorIfy(await passwordVerify(password));

      onComplete(true);
    } catch (error: any) {
      if (error instanceof CustomError) {
        setErrors(error.messages?.password);
      }

      onComplete(false);
    } finally {
      setLoading(false);
    }
  }

  function onCloseHandler(reason?: 'backdropClick' | 'escapeKeyDown') {
    if (loading || (reason && reason === 'backdropClick')) {
      return;
    }

    onClose(false);
  }

  return (
    <Dialog disableEnforceFocus open={open} onClose={(_e, r) => onCloseHandler(r)}>
      <DialogTitle>{t('verifyYourPassword.title')}</DialogTitle>
      <DialogContent>
        <DialogContentText className="!mb-2">{t('verifyYourPassword.content')}</DialogContentText>
        <Box
          component="form"
          noValidate
          autoComplete="off"
          id="subscription-form"
          onSubmit={onSubmitHandler}
        >
          <MhcPassword
            id="password"
            label={t('password')}
            type="password"
            autoFocus
            value={password}
            onFocus={() => setErrors(undefined)}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            errors={errors}
            required
            slotProps={{ input: { maxLength: 31 } }}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => onCloseHandler()} disabled={loading} color="error">
          {t('cancel')}
        </Button>
        <Button type="submit" form="subscription-form" loading={loading}>
          {t('continue')}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
