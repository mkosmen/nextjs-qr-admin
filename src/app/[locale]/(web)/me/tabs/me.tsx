import { User } from '@/lib/types';
import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import MeForm from '../components/MeForm';
import { Alert } from '@mui/material';
import { LINKS } from '@/lib/constant';
import { getApi, putApi } from '@/lib/utils';
import { setUser } from '@/lib/store/reducers/usersReducer';
import { useAppDispatch } from '@/lib/store/hooks';
import { useTranslations } from 'next-intl';
import { ToastContext } from '@/lib/providers/ToastProvider';

interface Props {
  user: User;
  verify: boolean;
  onComplete: () => void;
  onSubmit: () => void;
}

interface UpdateDto {
  name: string;
  surname: string;
}

export default function MeTab({ user, verify, onComplete, onSubmit }: Props) {
  const t = useTranslations();
  const dispatch = useAppDispatch();
  const toast = useContext(ToastContext);

  const updateDto = useRef<UpdateDto | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [formErrors, setFormErrors] = useState({});

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
      }>(LINKS.API_ROUTE.USER.ME, {
        body: JSON.stringify(updateDto.current),
      });

      if (result.status) {
        const me = await getApi<User>(LINKS.API_ROUTE.USER.ME);
        dispatch(setUser(me));

        toast?.showToast(t('meUpdateSuccess'));
      } else {
        setError(result?.message || t('meUpdateFailed'));

        if ('messages' in result) {
          setFormErrors((prev) => ({ ...prev, ...result.messages }));
        }
      }
    } catch (error: any) {
      setError(error?.message || t('anErrorOccured'));
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
