'use client';
import {
  DsBox,
  DsCustomButton,
  DsCustomCard,
  DsField,
  DsForm,
  DsFormInput,
  DsLabel,
  DsLogoCard,
  DsTypography,
} from '@crypto/ui';
import { LogIn } from 'lucide-react';
import Link from 'next/link';
import { AuthLoginFormData, authLoginSchema, useLogin } from '~/features/auth';
import { useAppForm } from '@crypto/frontend-core';
import { ASSETS } from '~/constants';
export default function Login() {
  const { loading, submit } = useLogin();
  const form = useAppForm(authLoginSchema);
  const onSubmit = (data: AuthLoginFormData) => {
    submit(data);
  };
  return (
    <DsCustomCard shadow className="w-full max-w-sm p-6">
      <DsForm onSubmit={onSubmit} form={form} className="grid grid-cols-1 gap-8">
        <DsBox className="w-20 h-20 rounded-lg">
          <DsLogoCard onlyLogo logoSrc={ASSETS.IMAGES.LOGO} />
        </DsBox>
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
    </DsCustomCard>
  );
}
