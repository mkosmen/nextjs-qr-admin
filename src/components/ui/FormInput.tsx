import { TextField, TextFieldProps, TextFieldVariants } from '@mui/material';
import ZodErrors from '@/components/ZodErrors';
import { ChangeEvent } from 'react';

interface FormInputProps extends Omit<TextFieldProps, 'variant'> {
  variant?: TextFieldVariants;
  errors?: string[];
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export default function FormInput(props: FormInputProps) {
  const { errors, error, ...other } = props;
  const hasError = error ?? (errors || [])?.length > 0;

  return (
    <div className="mb-1 w-full">
      <TextField error={hasError} size="small" {...other} />
      <ZodErrors errors={errors} />
    </div>
  );
}
