import { MeUpdateDto, User } from '@/lib/types';
import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import MeForm from '../components/MeForm';
import { Alert } from '@mui/material';
import { handleErrorIfy } from '@/lib/utils';
import { setUser } from '@/lib/store/reducers/usersReducer';
import { useAppDispatch } from '@/lib/store/hooks';
import { useTranslations } from 'next-intl';
import { ToastContext } from '@/lib/providers/ToastProvider';
import { me, updateMe } from '@/lib/services/user.service';
import CustomError from '@/lib/errors/CustomError';

interface Props {
  user: User;
  verify?: boolean;
  onComplete: () => void;
  onSubmit: () => void;
}

export default function MeTab({ user, verify, onComplete, onSubmit }: Props) {
  const t = useTranslations();
  const dispatch = useAppDispatch();
  const toast = useContext(ToastContext);

  const updateDto = useRef<MeUpdateDto | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  function onSubmitHandler(dto: MeUpdateDto) {
    updateDto.current = dto;
    onSubmit();
  }

  const runUpdate = useCallback(async () => {
    try {
      handleErrorIfy(await updateMe(updateDto.current!));

      const user = await me();
      dispatch(setUser(user));
      toast?.showToast(t('meUpdateSuccess'));
    } catch (error: any) {
      setError(error?.message || t('meUpdateFailed'));

      if (error instanceof CustomError) {
        setFormErrors((prev) => ({ ...prev, ...error.messages }));
      }
    } finally {
      setLoading(false);
      onComplete();
    }
  }, [dispatch, onComplete, t, toast]);

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

      <MeForm
        onSubmit={onSubmitHandler}
        loading={loading}
        errors={formErrors}
        user={user!}
        isDisabled={verify}
      />
    </div>
  );
}
