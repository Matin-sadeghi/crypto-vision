'use client';
//import { capitalize } from '@ndecision/common';
import { DsAppLayoutUserMenu } from '@crypto/ui';
import { useMutation } from '@tanstack/react-query';

// import { logout, useCurrentUser } from '~/api';
import { ROUTES } from '~/constants';
import { USER_NAVIGATION } from '~/constants/portal-nav';

export const ConsoleUserMenu = () => {
  // const navigate = useNavigate();
  // const user = useCurrentUser();

  // const signOut = useMutation({
  //   mutationFn: logout,
  //   onSuccess: () => navigate(ROUTES.SIGNIN, { replace: true }),
  // });

  return (
    <DsAppLayoutUserMenu
      displayName={'user?.fullName'}
      displayRole={'xxx'}
      avatarUrl={'user?.avatarUrl'}
      items={USER_NAVIGATION}
      onLogout={() => console.log('xxx')}
      isLogoutPending={false}
    />
  );
};
