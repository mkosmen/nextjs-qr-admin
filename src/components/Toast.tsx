import { Slide, SlideProps, Snackbar } from '@mui/material';
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
  const { autoHideDuration = 2000, vertical = 'top', horizontal = 'center', ...otherProps } = props;

  function SlideTransition(props: SlideProps) {
    return <Slide {...props} direction="down" />;
  }

  return (
    <Snackbar
      slots={{ transition: SlideTransition }}
      {...otherProps}
      autoHideDuration={autoHideDuration}
      anchorOrigin={{ vertical, horizontal }}
    />
  );
}
