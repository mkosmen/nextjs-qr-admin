'use client';

import { FormEvent, useState } from 'react';
import { useTranslations } from 'next-intl';
import signupValidation from '@/validations/signup';
import { useRouter, Link } from '@/i18n/navigation';
import { API_LINKS, LINKS } from '@/lib/constant';
import { postApi } from '@/lib/utils';
import { Button, Box, Alert } from '@mui/material';
import MhcInput from '@/components/ui/MhcInput';

export default function SigUpPage() {
  const t = useTranslations();
  const router = useRouter();

  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [signUpError, setSignUpError] = useState<string>();

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

      const result = await postApi<{
        status: boolean;
        message?: string;
        messages?: Record<string, string[]>;
      }>(API_LINKS.AUTH.SIGNUP, {
        body: JSON.stringify({ name, surname, email, password }),
      });

      if (result.status) {
        router.push(LINKS.LOGIN);
      } else {
        setSignUpError(result.message);
        if ('messages' in result) {
          setErrors((prev) => ({ ...prev, ...result.messages }));
        }
      }
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
        <p className="mb-3 text-lg font-medium">{t('signUp')}</p>

        {!!signUpError ? (
          <Alert severity="warning" onClose={() => setSignUpError('')} className="my-2">
            {signUpError}
          </Alert>
        ) : null}

        <MhcInput
          id="name"
          label={t('name')}
          variant="outlined"
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
          variant="outlined"
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
          variant="outlined"
          value={email}
          onFocus={() => setErrors((prev) => ({ ...prev, email: undefined }))}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          errors={errors?.email}
          slotProps={{ htmlInput: { maxLength: 31 } }}
        />

        <MhcInput
          id="password"
          label={t('password')}
          type="password"
          variant="outlined"
          value={password}
          onFocus={() => setErrors((prev) => ({ ...prev, password: undefined }))}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          errors={errors?.password}
          slotProps={{ htmlInput: { maxLength: 31 } }}
        />

        <Button variant="contained" type="submit" loading={loading}>
          {t('submit')}
        </Button>
      </Box>

      <p className="mt-4 text-center text-sm text-gray-700 opacity-50">
        {t('haveAnAccount')}
        <Link className="ml-1 font-medium underline" href="/login">
          {t('signIn')}
        </Link>
      </p>
    </>
  );
}
