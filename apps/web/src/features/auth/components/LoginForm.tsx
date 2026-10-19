'use client';
import { useAppForm } from '@crypto/frontend-core';
import {
  DsBox,
  DsCustomButton,
  DsField,
  DsForm,
  DsFormInput,
  DsLabel,
  DsTypography,
} from '@crypto/ui';
import { LogIn } from 'lucide-react';
import Link from 'next/link';
import { AuthLoginFormData, authLoginSchema, useLogin } from '~/features/auth';
export const LoginForm = () => {
  const { loading, submit } = useLogin();
  const form = useAppForm(authLoginSchema);
  const onSubmit = (data: AuthLoginFormData) => {
    submit(data);
  };

  return (
    <DsForm onSubmit={onSubmit} form={form} className="grid grid-cols-1 gap-8">
      <DsTypography>Sign in to your account</DsTypography>
      <DsField>
        <DsLabel>Email</DsLabel>
        <DsFormInput type="email" name="email" />
      </DsField>
      <DsField>
        <DsLabel>Password</DsLabel>
        <DsFormInput type="password" name="password" />
      </DsField>
      <DsBox className="flex items-center justify-between">
        <DsTypography variant="helperText">
          <Link href="/forgot-password">Forgot password?</Link>
        </DsTypography>
      </DsBox>
      <DsCustomButton endIcon={<LogIn size={18} />} type="submit" className="w-full">
        {loading ? 'Loading...' : 'Login'}
      </DsCustomButton>
    </DsForm>
  );
};
