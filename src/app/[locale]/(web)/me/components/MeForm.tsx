import { FormEvent, useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import meValidation from '@/validations/me';
import { Button, Box, Tooltip } from '@mui/material';
import MhcInput from '@/components/ui/MhcInput';
import { User } from '@/lib/types';

interface Props {
  loading: boolean;
  errors?: any;
  user: User;
  isDisabled?: boolean;
  onSubmit: (inputs: { name: string; surname: string }) => void;
}

export default function MeForm({ loading, errors, user, isDisabled, onSubmit }: Props) {
  const t = useTranslations();

  const [name, setName] = useState(user?.name);
  const [surname, setSurname] = useState(user?.surname);
  const [validationLoading, setValidationLoading] = useState(false);
  const [formErrors, setFormErrors] = useState<{
    name?: string[];
    surname?: string[];
  }>();

  useEffect(() => {
    setFormErrors((prev) => ({ ...prev, ...errors }));
  }, [errors]);

  async function onFormSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setValidationLoading(true);
    setFormErrors({});

    const validationResult = await meValidation({
      name,
      surname,
    });

    if (!validationResult.result) {
      setValidationLoading(false);
      setFormErrors(() => ({ ...validationResult.errors }));

      return;
    }

    setValidationLoading(false);
    onSubmit({ name: name!, surname: surname! });
  }

  function resetHandler() {
    setFormErrors({});
    setName(user.name);
    setSurname(user.surname);
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
        <MhcInput
          id="name"
          label={t('name')}
          value={name}
          autoFocus
          onFocus={() => setFormErrors((prev) => ({ ...prev, name: undefined }))}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          errors={formErrors?.name}
          slotProps={{ htmlInput: { maxLength: 31 } }}
        />

        <MhcInput
          id="surname"
          label={t('surname')}
          value={surname}
          onFocus={() => setFormErrors((prev) => ({ ...prev, surname: undefined }))}
          onChange={(e) => setSurname(e.target.value)}
          fullWidth
          errors={formErrors?.surname}
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

        <div className="flex gap-2">
          <Tooltip title={t('meResetTooltip')}>
            <Button
              variant="outlined"
              disabled={isDisabled}
              color="error"
              loading={validationLoading || loading}
              onClick={resetHandler}
            >
              {t('reset')}
            </Button>
          </Tooltip>
          <Button
            variant="contained"
            type="submit"
            disabled={isDisabled}
            loading={validationLoading || loading}
            className="flex-1"
          >
            {t('update')}
          </Button>
        </div>
      </Box>
    </>
  );
}
