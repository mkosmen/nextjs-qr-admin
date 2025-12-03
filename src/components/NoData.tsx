import { Button, ButtonProps } from '@mui/material';
import { useTranslations } from 'next-intl';
import { PropsWithChildren } from 'react';

interface Props {
  message?: string;
  retry?: boolean;
  retryText?: string;
  retryOptions?: ButtonProps;
  onRetry?: () => void;
}

export default function NoData({
  message,
  retry,
  retryText,
  children,
  retryOptions,
  onRetry,
}: PropsWithChildren<Props>) {
  const t = useTranslations();

  return (
    <div className="rounded-md p-3 text-center">
      <p className="text-xs text-gray-400 capitalize">
        {children || message || t('custom.noData')}
      </p>
      {retry && (
        <div className="mt-3">
          <Button
            onClick={onRetry}
            variant="contained"
            color="primary"
            {...retryOptions}
            type="button"
          >
            {retryText || t('retry')}
          </Button>
        </div>
      )}
    </div>
  );
}
