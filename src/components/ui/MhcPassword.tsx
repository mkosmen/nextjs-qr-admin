import { ChangeEvent, useState } from 'react';
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextFieldProps,
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import ZodErrors from '@/components/ZodErrors';

interface FormInputProps extends Omit<TextFieldProps, 'variant'> {
  errors?: string[];
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export default function FormInput(props: FormInputProps) {
  const { errors, error, ...other } = props;
  const hasError = error ?? (errors || [])?.length > 0;
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseEvent = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <FormControl size="small" variant="outlined" className="mb-1 w-full">
      <InputLabel htmlFor={other.id}>{other.label}</InputLabel>
      <OutlinedInput
        id={other.id}
        error={hasError}
        type={showPassword ? 'text' : 'password'}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label={showPassword ? 'hide the password' : 'display the password'}
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseEvent}
              onMouseUp={handleMouseEvent}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
        label={other.label}
      />
      <ZodErrors errors={errors} />
    </FormControl>
  );
}
