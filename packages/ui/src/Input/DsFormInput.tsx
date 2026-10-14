"use client"
import clsx from 'clsx';
import type { ReactNode } from 'react';
import { useFormContext } from 'react-hook-form';

import { DsInput, DsInputGroup } from './DsInput';
import { DsInputIconSlot } from './DsInputIconSlot';

type DsFormInputProps = React.ComponentProps<typeof DsInput> & {
  name: string;
  label?: string;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  inputGroupClassName?: string;
};

export function DsFormInput({
  name,
  label,
  startIcon,
  endIcon,
  inputGroupClassName,
  className,
  size,
  ...inputProps
}: DsFormInputProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const hasError = errors[name];
  const hasIcons = Boolean(startIcon || endIcon);

  const input = (
    <DsInput
      id={name}
      {...(hasError ? { 'data-invalid': true } : {})}
      {...register(name)}
      size={size}
      className={className}
      {...inputProps}
    />
  );

  return (
    <div className="space-y-1">
      {hasIcons ? (
        <DsInputGroup
          className={clsx(
            startIcon && 'has-[[data-slot=icon]:first-child]:[&_input]:!pl-14',
            inputGroupClassName,
          )}
        >
          {startIcon ? <DsInputIconSlot>{startIcon}</DsInputIconSlot> : null}
          {input}
          {endIcon ? <DsInputIconSlot className="mr-2">{endIcon}</DsInputIconSlot> : null}
        </DsInputGroup>
      ) : (
        input
      )}

      {hasError && <p className="text-sm text-red-500">{hasError?.message as string}</p>}
    </div>
  );
}
