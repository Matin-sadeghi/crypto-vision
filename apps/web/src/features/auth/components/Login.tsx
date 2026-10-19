'use client';
import { DsBox, DsCustomCard, DsLogoCard } from '@crypto/ui';
import { ASSETS } from '~/constants';
import { LoginForm } from '~/features/auth';
export const Login = () => {
  return (
    <DsCustomCard shadow className="w-full max-w-sm p-6 space-y-6">
      <DsBox className="w-20 h-20 rounded-lg">
        <DsLogoCard onlyLogo logoSrc={ASSETS.IMAGES.LOGO} />
      </DsBox>
      <LoginForm />
    </DsCustomCard>
  );
};
