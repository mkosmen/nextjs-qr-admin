import { Fade, Snackbar } from '@mui/material';
import { ReactNode } from 'react';

interface Props {
  open: boolean;
  vertical?: 'top' | 'bottom';
  horizontal?: 'right' | 'left' | 'center';
  message: ReactNode;
  autoHideDuration?: number | null;
  onClose: () => void;
}

export default function Toast(props: Props) {
  const { vertical = 'top', horizontal = 'center', ...otherProps } = props;
  return <Snackbar slots={{ transition: Fade }} {...otherProps} key={vertical + horizontal} />;
}
