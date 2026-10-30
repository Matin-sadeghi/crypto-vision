'use client';
import { DsBox, DsTypography } from '@crypto/ui';
import Link from 'next/link';
import { ROUTES } from '~/constants';
import { useCurrentUser } from '~/features';

export const AdminAuthGuard = ({ children }: { children: React.ReactNode }) => {
  const { user } = useCurrentUser();

  if (!user) {
    return (
      <DsBox bg={'background'} className="flex min-h-dvh items-center justify-center">
        <DsTypography>Loading...</DsTypography>
      </DsBox>
    );
  }

  if (!user.is_staff) {
    return (
      <DsBox
        bg={'background'}
        className="flex min-h-dvh flex-col items-center justify-center gap-4"
      >
        <DsTypography>You do not have permission to view this page.</DsTypography>
        <DsTypography variant="helperText">
          <Link href={ROUTES.DASHBOARD.OVERVIEW}>Back to dashboard</Link>
        </DsTypography>
      </DsBox>
    );
  }

  return children;
};
