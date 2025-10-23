'use client';

import { FormEvent, useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter, Link } from '@/i18n/navigation';
import loginValidation from '@/validations/login';
import { Button, Box, Alert } from '@mui/material';
import MhcInput from '@/components/ui/MhcInput';
import MhcPassword from '@/components/ui/MhcPassword';
import { LINKS } from '@/lib/constant';
import { getApi, postApi } from '@/lib/utils';
import { useAppDispatch } from '@/lib/store/hooks';
import { setUser } from '@/lib/store/reducers/usersReducer';
import { User } from '@/lib/types';

export default function LoginPage() {
  const t = useTranslations();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{
    email?: string[];
    password?: string[];
  }>();
  const [loginError, setLoginError] = useState<string | undefined>('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    dispatch(setUser());
  }, [dispatch]);

  async function onFormSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setLoginError('');
    setErrors(() => ({}));

    const validationResult = await loginValidation({
      email,
      password,
    });

    if (!validationResult.result) {
      setErrors(() => ({ ...validationResult.errors }));

      return;
    }

    setLoading(true);

    try {
      const result = await postApi(LINKS.API_ROUTE.AUTH.LOGIN, {
        body: JSON.stringify({ email, password }),
      });

      const me = await getApi<User>(LINKS.API_ROUTE.USER.ME);
      dispatch(setUser(me));

      if (result.status) {
        router.push(LINKS.WEB.DASHBOARD);
      } else {
        setLoading(false);
        setLoginError(result?.message);

        if ('messages' in e) {
          setErrors((prev) => ({ ...prev, ...result.messages }));
        }
      }
    } catch {
      setLoading(false);
      setLoginError(t('anErrorOccured'));
    }
  }

  return (
    <>
      <Box
        component="form"
        noValidate
        autoComplete="off"
        className="flex w-full flex-col gap-2 rounded border border-gray-200 bg-white px-12 py-8 pt-4"
        onSubmit={onFormSubmit}
      >
        <p className="mb-4 w-full text-lg font-medium">{t('signIn')}</p>

        {!!loginError ? (
          <Alert severity="warning" onClose={() => setLoginError('')} className="my-2">
            {loginError}
          </Alert>
        ) : null}

        <MhcInput
          id="email"
          label={t('email')}
          value={email}
          onFocus={() =>
            setErrors((prev) => ({
              ...prev,
              email: undefined,
            }))
          }
          autoFocus
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          errors={errors?.email}
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
        />

        <Button variant="contained" type="submit" loading={loading}>
          {t('submit')}
        </Button>
      </Box>

      <p className="mt-4 text-center text-sm text-gray-700 opacity-50">
        {t('dontHaveAnAccount')}
        <Link className="ml-1 font-medium underline" href={LINKS.WEB.SIGNUP}>
          {t('signUp')}
        </Link>
      </p>
    </>
  );
}
