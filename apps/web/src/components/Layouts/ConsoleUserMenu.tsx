'use client';
import { DsAppLayoutUserMenu } from '@crypto/ui';
import { useCurrentUser, useLogout } from '~/features/auth/hooks';
import { USER_NAVIGATION } from '~/constants/portal-nav';

export const ConsoleUserMenu = () => {
  const { user, isLoading } = useCurrentUser();
  const { logout, isPending } = useLogout();

  return (
    <DsAppLayoutUserMenu
      displayName={
        isLoading
          ? 'Loading...'
          : [user?.first_name, user?.last_name].filter(Boolean).join(' ') || user?.email
      }
      items={USER_NAVIGATION}
      onLogout={logout}
      isLogoutPending={isPending}
    />
  );
};
