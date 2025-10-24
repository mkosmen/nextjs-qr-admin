import { useState, useRef } from 'react';
import { Alert } from '@mui/material';
import PasswordForm from '../components/PasswordForm';

interface Props {
  isDisabled: boolean;
  setVerifyDialogStatus: (status: boolean) => void;
}

interface UpdateDto {
  newPassword: string;
  newPasswordAgain: string;
}

export default function PasswordTab({ isDisabled, setVerifyDialogStatus }: Props) {
  const updateDto = useRef<UpdateDto | null>(null);

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  function onSubmitHandler(dto: UpdateDto) {
    updateDto.current = dto;
    setVerifyDialogStatus(true);
  }

  return (
    <div className="max-w-sm">
      {!!error ? (
        <Alert severity="warning" onClose={() => setError('')} className="mb-5">
          {error}
        </Alert>
      ) : null}
      <PasswordForm
        onSubmit={onSubmitHandler}
        loading={loading}
        errors={errors}
        isDisabled={isDisabled}
      />
    </div>
  );
}
