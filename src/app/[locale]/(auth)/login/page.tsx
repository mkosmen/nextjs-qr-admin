'use client';

import { FormEvent, useState } from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { API_LINKS, LINKS } from '@/lib/constant';
import { postApi } from '@/lib/utils';
import loginValidation from '@/validations/login';
import { Button, Box, Alert } from '@mui/material';
import MhcInput from '@/components/ui/MhcInput';
import MhcPassword from '@/components/ui/MhcPassword';

export default function LoginPage() {
  const t = useTranslations();
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{
    email?: string[];
    password?: string[];
  }>();
  const [showAlert, setShowAlert] = useState(false);
  const [loading, setLoading] = useState(false);

  async function onFormSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setShowAlert(false);
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
      const result = await postApi(API_LINKS.AUTH.LOGIN, {
        body: JSON.stringify({ email, password }),
      });

      if (result.status) {
        router.push(`/${LINKS.DASHBOARD}`);
      } else {
        setShowAlert(true);
        if ('messages' in result) {
          setErrors((prev) => ({ ...prev, ...result.messages }));
        }
      }
    } catch (e: any) {
      console.log('HATA VAR', e);
    } finally {
      setLoading(false);
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

        {showAlert ? (
          <Alert severity="warning" onClose={() => setShowAlert(false)} className="my-2">
            {t('loginFailed')}
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
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          error={(errors?.email || []).length > 0}
        />

        <MhcPassword
          id="password"
          label={t('password')}
          type="password"
          value={password}
          onFocus={() => setErrors((prev) => ({ ...prev, password: undefined }))}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          error={(errors?.password || []).length > 0}
        />

        <Button variant="contained" type="submit" loading={loading}>
          {t('submit')}
        </Button>
      </Box>

      <p className="mt-4 text-center text-sm text-gray-700 opacity-50">
        {t('dontHaveAnAccount')}
        <Link className="ml-1 font-medium underline" href="/sign-up">
          {t('signUp')}
        </Link>
      </p>
    </>
  );
}
