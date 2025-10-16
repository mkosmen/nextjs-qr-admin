import { FormEvent, useState } from 'react';
import { useTranslations } from 'next-intl';
import meValidation from '@/validations/me';
import { LINKS } from '@/lib/constant';
import { getApi, postApi } from '@/lib/utils';
import { Button, Box, Alert } from '@mui/material';
import MhcInput from '@/components/ui/MhcInput';
import MhcPassword from '@/components/ui/MhcPassword';
import { User } from '@/lib/types';
import { useAppDispatch } from '@/lib/store/hooks';
import { setUser } from '@/lib/store/reducers/usersReducer';

export default function MePage() {
  const t = useTranslations();
  const dispatch = useAppDispatch();

  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPassword2, setNewPassword2] = useState('');
  const [loading, setLoading] = useState(false);
  const [signUpError, setSignUpError] = useState<string | undefined>('');

  const [errors, setErrors] = useState<{
    name?: string[];
    surname?: string[];
    password?: string[];
    newPassword?: string[];
    newPassword2?: string[];
  }>();

  async function onFormSubmit(e: FormEvent<HTMLFormElement>) {
    try {
      e.preventDefault();
      setLoading(true);

      setErrors(() => ({}));

      const validationResult = await meValidation({
        name,
        surname,
        password,
        newPassword,
        newPassword2,
      });

      if (!validationResult.result) {
        setErrors(() => ({ ...validationResult.errors }));

        return;
      }

      const result = await postApi<{
        status: boolean;
        message?: string;
        messages?: Record<string, string[]>;
      }>(LINKS.API_ROUTE.USER.ME, {
        body: JSON.stringify({ name, surname, password, newPassword, newPassword2 }),
      });

      if (result.status) {
        const me = await getApi<User>(LINKS.API_ROUTE.USER.ME);
        dispatch(setUser(me));
      } else {
        setSignUpError(result.message);
        if ('messages' in result) {
          setErrors((prev) => ({ ...prev, ...result.messages }));
        }

        setLoading(false);
      }
    } catch (err: any) {
      setSignUpError(err?.message);
      setLoading(false);
    }
  }

  return (
    <>
      <Box
        component="form"
        noValidate
        autoComplete="off"
        className="flex max-w-xl flex-col gap-2 rounded border border-gray-200 bg-white p-8"
        onSubmit={onFormSubmit}
      >
        {!!signUpError ? (
          <Alert severity="warning" onClose={() => setSignUpError('')} className="my-2">
            {signUpError}
          </Alert>
        ) : null}

        <MhcInput
          id="name"
          label={t('name')}
          value={name}
          autoFocus
          onFocus={() => setErrors((prev) => ({ ...prev, name: undefined }))}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          errors={errors?.name}
          slotProps={{ htmlInput: { maxLength: 31 } }}
        />

        <MhcInput
          id="surname"
          label={t('surname')}
          value={surname}
          onFocus={() => setErrors((prev) => ({ ...prev, surname: undefined }))}
          onChange={(e) => setSurname(e.target.value)}
          fullWidth
          errors={errors?.surname}
          slotProps={{ htmlInput: { maxLength: 31 } }}
        />

        <MhcPassword
          id="newPassword"
          label={t('newPassword')}
          type="password"
          value={newPassword}
          onFocus={() => setErrors((prev) => ({ ...prev, newPassword: undefined }))}
          onChange={(e) => setNewPassword(e.target.value)}
          fullWidth
          errors={errors?.newPassword}
          slotProps={{ input: { maxLength: 31 } }}
        />

        <MhcPassword
          id="newPassword2"
          label={t('newPasswordAgain')}
          type="password"
          value={newPassword2}
          onFocus={() => setErrors((prev) => ({ ...prev, newPassword2: undefined }))}
          onChange={(e) => setNewPassword2(e.target.value)}
          fullWidth
          errors={errors?.newPassword2}
          slotProps={{ input: { maxLength: 31 } }}
        />

        <MhcPassword
          id="password"
          label={t('password')}
          type="password"
          value={password}
          onFocus={() => setErrors((prev) => ({ ...prev, password: undefined }))}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          errors={errors?.password}
          slotProps={{ input: { maxLength: 31 } }}
        />

        <Button variant="contained" type="submit" loading={loading}>
          {t('submit')}
        </Button>
      </Box>
    </>
  );
}
