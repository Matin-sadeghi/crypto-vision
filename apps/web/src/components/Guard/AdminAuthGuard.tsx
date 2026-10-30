'use client';
import { DsBox, DsTypography } from '@crypto/ui';
import Link from 'next/link';
import { ROUTES } from '~/constants';
import { useCurrentUser } from '~/features';

export const AdminAuthGuard = ({ children }: { children: React.ReactNode }) => {
  const { user } = useCurrentUser();
  const isAdmin = Boolean(user?.is_staff);

  return (
    <>
      {!user && (
        <DsBox bg={'background'} className="flex min-h-dvh items-center justify-center">
          <DsTypography>Loading...</DsTypography>
        </DsBox>
      )}
      {user && !isAdmin && (
        <DsBox
          bg={'background'}
          className="flex min-h-dvh flex-col items-center justify-center gap-4"
        >
          <DsTypography>You do not have permission to view this page.</DsTypography>
          <DsTypography variant="helperText">
            <Link href={ROUTES.DASHBOARD.OVERVIEW}>Back to dashboard</Link>
          </DsTypography>
        </DsBox>
      )}
      <div hidden={!isAdmin} className="contents">
        {children}
      </div>
    </>
  );
};
