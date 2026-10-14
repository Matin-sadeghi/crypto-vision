"use client"
import { DsBox,DsCheckbox, DsCheckboxField, DsCustomButton, DsField, DsFormInput, DsLabel, DsLogoCard, DsTypography,DsForm,DsCustomCard } from '@crypto/ui';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { ASSETS } from '~/constants';
export default function Login() {
  const form = useForm({})


  return (
  <DsCustomCard shadow className="w-full max-w-sm p-6">
  <DsForm form={form}  className="grid grid-cols-1 gap-8">
      <DsBox className="w-20 h-20 rounded-lg"  >
        <DsLogoCard  onlyLogo logoSrc={ASSETS.IMAGES.LOGO} />
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
        <DsCheckboxField>
          <DsCheckbox name="remember" />
          <DsLabel>Remember me</DsLabel>
        </DsCheckboxField>
        <DsTypography>
          <Link href="/forgot-password">
            Forgot password?
          </Link>
        </DsTypography>
      </DsBox>
      <DsCustomButton type="submit" className="w-full">
        Login
      </DsCustomButton>
    </DsForm>
      </DsCustomCard>

  );
}
