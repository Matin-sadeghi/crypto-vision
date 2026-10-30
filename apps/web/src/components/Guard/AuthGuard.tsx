'use client';
import { DsBox, DsTypography } from '@crypto/ui';
import { useCurrentUser } from '~/features';

export const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const { user } = useCurrentUser();

  return (
    <>
      {!user && (
        <DsBox bg={'background'} className="flex min-h-dvh items-center justify-center">
          <DsTypography>Loading...</DsTypography>
        </DsBox>
      )}
      <div hidden={!user} className="contents">
        {children}
      </div>
    </>
  );
};
