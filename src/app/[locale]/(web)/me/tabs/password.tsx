'use client';

import { useState, useRef, useCallback, useContext, useEffect } from 'react';
import { Alert } from '@mui/material';
import PasswordForm from '../components/PasswordForm';
import { ToastContext } from '@/lib/providers/ToastProvider';
import { useTranslations } from 'next-intl';
import { passwordReset } from '@/lib/services/user.service';
import { PasswordUpdateDto } from '@/lib/types';
import CustomError from '@/lib/errors/CustomError';

interface Props {
  verify?: boolean;
  onComplete: () => void;
  onSubmit: () => void;
}

export default function PasswordTab({ verify, onComplete, onSubmit }: Props) {
  const t = useTranslations();
  const toast = useContext(ToastContext);

  const updateDto = useRef<PasswordUpdateDto | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  function onSubmitHandler(dto: PasswordUpdateDto) {
    updateDto.current = dto;
    onSubmit();
  }

  const runUpdate = useCallback(async () => {
    try {
      await passwordReset(updateDto.current!);

      toast?.showToast(t('passwordUpdateSuccess'));
    } catch (error: any) {
      setError(error?.message || t('passwordUpdateFailed'));

      if (error instanceof CustomError) {
        setErrors((prev) => ({ ...prev, ...error.messages }));
      }
      setError(t('anErrorOccured'));
    } finally {
      setLoading(false);
      onComplete();
    }
  }, [onComplete, t, toast]);

  useEffect(() => {
    if (verify) {
      runUpdate();
    }
  }, [verify, runUpdate]);

  return (
    <div className="max-w-sm">
      {!!error ? (
        <Alert severity="warning" onClose={() => setError('')} className="mb-5">
          {error}
        </Alert>
      ) : null}
      <PasswordForm
        onSubmit={onSubmitHandler}
        loading={loading}
        errors={errors}
        isDisabled={verify}
      />
    </div>
  );
}
