'use client';

import { FormEvent, useState } from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import loginValidation from '@/validations/login';
import ZodErrors from '@/components/ZodErrors';
import { Button, TextField, Box, Alert } from '@mui/material';
import { redirect } from 'next/navigation';
import { LINKS } from '@/lib/constant';
import { postApi } from '@/lib/utils';

export default function LoginPage() {
  const t = useTranslations();

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
      const result = await postApi<{ result: boolean }>('/api/auth/login', {
        body: JSON.stringify({ email, password }),
      });

      if (!result.result) {
        setShowAlert(true);
      } else {
        redirect(`/${LINKS.DASHBOARD}`);
      }
    } catch (e: any) {
      console.log('HATA VAR', e);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center bg-gray-100">
      <Box
        component="form"
        noValidate
        autoComplete="off"
        className="flex w-xs flex-col gap-2 rounded border border-gray-200 bg-white px-12 py-8 pt-4"
        onSubmit={onFormSubmit}
      >
        <p className="mb-4 w-full text-center text-lg font-medium">{t('signIn')}</p>

        {showAlert ? (
          <Alert severity="warning" onClose={() => setShowAlert(false)} className="my-2">
            {t('loginFailed')}
          </Alert>
        ) : null}

        <div className="mb-1 w-full">
          <TextField
            id="email"
            label={t('email')}
            variant="outlined"
            value={email}
            onFocus={() => setErrors((prev) => ({ ...prev, email: undefined }))}
            onChange={(e) => setEmail(e.target.value)}
            required
            fullWidth
            error={(errors?.email || []).length > 0}
          />
          <ZodErrors errors={errors?.email} />
        </div>

        <div className="mb-1 w-full">
          <TextField
            id="password"
            label={t('password')}
            type="password"
            variant="outlined"
            value={password}
            onFocus={() => setErrors((prev) => ({ ...prev, password: undefined }))}
            onChange={(e) => setPassword(e.target.value)}
            required
            fullWidth
            error={(errors?.password || []).length > 0}
          />
          <ZodErrors errors={errors?.password} />
        </div>

        <Button variant="contained" type="submit" loading={loading}>
          {t('submit')}
        </Button>
      </Box>

      <p className="mt-4 text-sm text-gray-700 opacity-50">
        {t('dontHaveAnAccount')}
        <Link className="ml-1 font-medium underline" href="/sign-up">
          {t('signUp')}
        </Link>
      </p>
    </div>
  );
}
