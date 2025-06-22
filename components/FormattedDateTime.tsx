import { cn, formatDateTime } from '@/lib/utils';
import React from 'react';

interface Props {
  date: string;
  className?: string;
}

const FormattedDateTime = ({ date, className }: Props) => {
  return (
    <p className={cn('body-2 text-light-100', className)}>
      {formatDateTime(date)}
    </p>
  );
};

export default FormattedDateTime;
