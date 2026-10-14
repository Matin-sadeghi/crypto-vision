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
import { authLoginSchema, AuthLoginFormData } from '~/features/auth/types';
import { LogIn } from 'lucide-react';
import Link from 'next/link';

import { ASSETS } from '~/constants';
import { useAppForm } from '@crypto/frontend-core';
export default function Login() {
  const form = useAppForm(authLoginSchema);
  const submit = (data: AuthLoginFormData) => {
    console.log(data);
  };
  return (
    <DsCustomCard shadow className="w-full max-w-sm p-6">
      <DsForm onSubmit={submit} form={form} className="grid grid-cols-1 gap-8">
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
          Login
        </DsCustomButton>
      </DsForm>
    </DsCustomCard>
  );
}
