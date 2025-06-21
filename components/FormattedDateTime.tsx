import { cn, formatDateTime } from '@/lib/utils'
import React from 'react'

const FormattedDateTime = ({date, className} : {date: string, className?:string}) => {
  return (
    <p className={cn('body-2 text-light-100')}>
      {formatDateTime(date)}
    </p>
  )
}

export default FormattedDateTime
