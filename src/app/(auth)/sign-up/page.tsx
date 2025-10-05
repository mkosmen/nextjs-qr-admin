'use client';

import { FormEvent, useState } from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import signupValidation from '@/validations/signup';
import ZodErrors from '@/components/ZodErrors';
import { Button, TextField, Box } from '@mui/material';
import { redirect } from 'next/navigation';
import { LINKS } from '@/lib/constant';

export default function LoginPage() {
  const t = useTranslations();

  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState<{
    name?: string[];
    surname?: string[];
    email?: string[];
    password?: string[];
  }>();

  async function onFormSubmit(e: FormEvent<HTMLFormElement>) {
    try {
      e.preventDefault();
      setLoading(true);

      setErrors(() => ({}));

      const validationResult = await signupValidation({
        name,
        surname,
        email,
        password,
      });

      if (!validationResult.result) {
        setErrors(() => ({ ...validationResult.errors }));

        return;
      }

      await (
        await fetch('/api/auth/signup', {
          method: 'POST',
          body: JSON.stringify({ name, surname, email, password }),
        })
      ).json();

      redirect(`/${LINKS.LOGIN}`);
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
        <p className="mb-3 text-lg font-medium">{t('signIn')}</p>
        <div className="mb-1 w-full">
          <TextField
            id="name"
            label={t('name')}
            variant="outlined"
            value={name}
            onFocus={() => setErrors((prev) => ({ ...prev, name: undefined }))}
            onChange={(e) => setName(e.target.value)}
            required
            fullWidth
            error={(errors?.name || []).length > 0}
          />
          <ZodErrors errors={errors?.name} />
        </div>
        <div className="mb-1 w-full">
          <TextField
            id="surname"
            label={t('surname')}
            variant="outlined"
            value={surname}
            onFocus={() => setErrors((prev) => ({ ...prev, surname: undefined }))}
            onChange={(e) => setSurname(e.target.value)}
            required
            fullWidth
            error={(errors?.surname || []).length > 0}
          />
          <ZodErrors errors={errors?.name} />
        </div>
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
        {t('haveAnAccount')}
        <Link className="ml-1 font-medium underline" href="/login">
          {t('signIn')}
        </Link>
      </p>
    </div>
  );
}
