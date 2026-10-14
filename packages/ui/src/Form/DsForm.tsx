"use client"
import clsx from 'clsx';
import { FormProvider } from 'react-hook-form';

type Props = {
  className?: string;
  form: any;
  onSubmit?: (data: any) => void;
  children: React.ReactNode;
};

export const DsForm = ({ className, form, onSubmit = () => {}, children }: Props) => {
  return (
    <FormProvider {...form}>
      <form className={clsx(className)} onSubmit={form.handleSubmit(onSubmit)}>
        {children}
      </form>
    </FormProvider>
  );
};
