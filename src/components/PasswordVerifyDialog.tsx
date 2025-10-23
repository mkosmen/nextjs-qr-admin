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
import { LINKS } from '@/lib/constant';
import { postApi } from '@/lib/utils';

interface Props {
  open: boolean;
  onClose: () => void;
  onVerified: (status: boolean) => void;
}

export default function PasswordVerifyDialog(props: Props) {
  const t = useTranslations();

  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<string[]>();

  useEffect(() => {
    return () => {
      setErrors(undefined);
      setPassword('');
    };
  }, [props.open]);

  async function onSubmitHandler(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setLoading(true);
    setErrors(undefined);

    const validationResult = await passwordVerifyValidation(password);

    if (!validationResult.result) {
      setLoading(false);
      setErrors(validationResult.errors?.password);

      return;
    }

    const result = await postApi<{
      status: boolean;
      message?: string;
      messages?: Record<string, string[]>;
    }>(LINKS.API_ROUTE.USER.PASSWORD.VERIFY, { body: JSON.stringify({ password }) });

    if (!result.status && 'messages' in result) {
      setErrors(result.messages?.password);
    }

    props.onVerified(result.status);
    setLoading(false);
  }

  function onCloseHandler(reason?: 'backdropClick' | 'escapeKeyDown') {
    if (loading || (reason && reason === 'backdropClick')) {
      return;
    }

    props.onClose();
  }

  return (
    <Dialog disableEnforceFocus open={props.open} onClose={(_e, r) => onCloseHandler(r)}>
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
