import { FormEvent, useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import passwordValidation from '@/validations/password';
import { Button, Box } from '@mui/material';
import MhcPassword from '@/components/ui/MhcPassword';

interface Props {
  loading: boolean;
  errors?: any;
  isDisabled?: boolean;
  onSubmit: (inputs: { newPassword: string; newPasswordAgain: string }) => void;
}

export default function PasswordForm(props: Props) {
  const t = useTranslations();

  const [newPassword, setNewPassword] = useState('');
  const [newPasswordAgain, setNewPasswordAgain] = useState('');
  const [validationLoading, setValidationLoading] = useState(false);
  const [errors, setErrors] = useState<{
    newPassword?: string[];
    newPasswordAgain?: string[];
  }>();

  useEffect(() => {
    setErrors((prev) => ({ ...prev, ...props.errors }));
  }, [props.errors]);

  async function onFormSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setValidationLoading(true);
    setErrors({});

    const validationResult = await passwordValidation({
      newPassword,
      newPasswordAgain,
    });

    if (!validationResult.result) {
      setValidationLoading(false);
      setErrors(() => ({ ...validationResult.errors }));

      return;
    }

    setValidationLoading(false);
    props.onSubmit({ newPassword: newPassword!, newPasswordAgain: newPasswordAgain! });
  }

  return (
    <>
      <Box
        component="form"
        noValidate
        autoComplete="off"
        className="flex flex-col gap-3"
        onSubmit={onFormSubmit}
      >
        <MhcPassword
          id="newPassword"
          label={t('newPassword')}
          value={newPassword}
          autoFocus
          onFocus={() => setErrors((prev) => ({ ...prev, newPassword: undefined }))}
          onChange={(e) => setNewPassword(e.target.value)}
          fullWidth
          errors={errors?.newPassword}
          slotProps={{ input: { maxLength: 31 } }}
        />

        <MhcPassword
          id="newPasswordAgain"
          label={t('newPasswordAgain')}
          value={newPasswordAgain}
          onFocus={() => setErrors((prev) => ({ ...prev, newPasswordAgain: undefined }))}
          onChange={(e) => setNewPasswordAgain(e.target.value)}
          fullWidth
          errors={errors?.newPasswordAgain}
          slotProps={{ input: { maxLength: 31 } }}
        />

        <Button
          variant="contained"
          type="submit"
          disabled={props.isDisabled}
          loading={validationLoading || props.loading}
        >
          {t('update')}
        </Button>
      </Box>
    </>
  );
}
