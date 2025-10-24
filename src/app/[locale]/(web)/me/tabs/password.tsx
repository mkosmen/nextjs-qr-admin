import { useState, useRef, useCallback, useContext, useEffect } from 'react';
import { Alert } from '@mui/material';
import PasswordForm from '../components/PasswordForm';
import { putApi } from '@/lib/utils';
import { LINKS } from '@/lib/constant';
import { ToastContext } from '@/lib/providers/ToastProvider';
import { useTranslations } from 'next-intl';

interface Props {
  verify?: boolean;
  onComplete: () => void;
  onSubmit: () => void;
}

interface UpdateDto {
  newPassword: string;
  newPasswordAgain: string;
}

export default function PasswordTab({ verify, onComplete, onSubmit }: Props) {
  const t = useTranslations();
  const toast = useContext(ToastContext);

  const updateDto = useRef<UpdateDto | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  function onSubmitHandler(dto: UpdateDto) {
    updateDto.current = dto;
    onSubmit();
  }

  const runUpdate = useCallback(async () => {
    try {
      const result = await putApi<{
        status: boolean;
        message?: string;
        messages?: Record<string, string[]>;
      }>(LINKS.API_ROUTE.USER.PASSWORD.RESET, {
        body: JSON.stringify(updateDto.current),
      });

      if (result.status) {
        toast?.showToast(t('passwordUpdateSuccess'));
      } else {
        setError(result?.message || t('passwordUpdateFailed'));

        if ('messages' in result) {
          setErrors((prev) => ({ ...prev, ...result.messages }));
        }
      }
    } catch {
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
