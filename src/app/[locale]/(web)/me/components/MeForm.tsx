import { FormEvent, useState } from 'react';
import { useTranslations } from 'next-intl';
import meValidation from '@/validations/me';
import { LINKS } from '@/lib/constant';
import { getApi, postApi } from '@/lib/utils';
import { Button, Box, Alert } from '@mui/material';
import MhcInput from '@/components/ui/MhcInput';
import { User } from '@/lib/types';
import { useAppDispatch, useAppStore } from '@/lib/store/hooks';
import { setUser } from '@/lib/store/reducers/usersReducer';

export default function MeForm() {
  const t = useTranslations();
  const dispatch = useAppDispatch();
  const store = useAppStore();
  const user = store.getState().user.user;

  const [name, setName] = useState(user?.name);
  const [surname, setSurname] = useState(user?.surname);
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
        body: JSON.stringify({ name, surname }),
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
        className="flex max-w-sm flex-col gap-2"
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

        <MhcInput
          id="email"
          label={t('email')}
          value={user?.email}
          fullWidth
          className="[&_input]:!cursor-not-allowed [&_input]:!text-gray-400"
          slotProps={{ input: { readOnly: true } }}
        />

        <Button variant="contained" type="submit" loading={loading}>
          {t('update')}
        </Button>
      </Box>
    </>
  );
}
