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

export default function MeForm(props: Props) {
  const t = useTranslations();

  const [name, setName] = useState(props.user?.name);
  const [surname, setSurname] = useState(props.user?.surname);
  const [validationLoading, setValidationLoading] = useState(false);
  const [errors, setErrors] = useState<{
    name?: string[];
    surname?: string[];
  }>();

  useEffect(() => {
    setErrors((prev) => ({ ...prev, ...props.errors }));
  }, [props.errors]);

  async function onFormSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setValidationLoading(true);
    setErrors({});

    const validationResult = await meValidation({
      name,
      surname,
    });

    if (!validationResult.result) {
      setValidationLoading(false);
      setErrors(() => ({ ...validationResult.errors }));

      return;
    }

    setValidationLoading(false);
    props.onSubmit({ name: name!, surname: surname! });
  }

  function resetHandler() {
    setErrors({});
    setName(props.user.name);
    setSurname(props.user.surname);
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
          value={props.user?.email}
          fullWidth
          className="[&_input]:!cursor-not-allowed [&_input]:!text-gray-400"
          slotProps={{ input: { readOnly: true } }}
        />

        <div className="flex gap-2">
          <Tooltip title={t('meResetTooltip')}>
            <Button
              variant="outlined"
              disabled={props.isDisabled}
              color="error"
              loading={validationLoading || props.loading}
              onClick={resetHandler}
            >
              {t('reset')}
            </Button>
          </Tooltip>
          <Button
            variant="contained"
            type="submit"
            disabled={props.isDisabled}
            loading={validationLoading || props.loading}
            className="flex-1"
          >
            {t('update')}
          </Button>
        </div>
      </Box>
    </>
  );
}
