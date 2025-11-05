import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  SelectProps,
} from '@mui/material';
import ZodErrors from '@/components/ZodErrors';
import { Clear } from '@mui/icons-material';

type Props = {
  error?: boolean;
  errors?: string[];
  items: any[];
  valueId?: string;
  keyId?: string;
  labelId?: string;
  onClear?: () => void;
} & SelectProps;

export default function FormSelect(props: Props) {
  const { errors, error, valueId, keyId, labelId, items, onClear, ...selectProps } = props;
  const hasError = error ?? (errors || [])?.length > 0;

  return (
    <div className="mb-1 w-full">
      <FormControl fullWidth>
        <InputLabel id={props.id + '_label'} size="small">
          {props.label}
        </InputLabel>
        <Select
          labelId={props.id + '_label'}
          error={hasError}
          {...selectProps}
          size="small"
          endAdornment={
            props.value ? (
              <InputAdornment sx={{ position: 'absolute', right: 32 }} position="end">
                <IconButton onClick={onClear}>
                  <Clear></Clear>
                </IconButton>
              </InputAdornment>
            ) : undefined
          }
        >
          {items.map((m) => {
            return (
              <MenuItem value={valueId ? m[valueId] : m} key={keyId ? m[keyId] : m}>
                {labelId ? m[labelId] : m}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
      <ZodErrors errors={errors} />
    </div>
  );
}
