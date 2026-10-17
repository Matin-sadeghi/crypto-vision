'use client';

import {
  DsAppLayoutNotifications,
  DsAppLayoutSearchBar,
  DsAppLayoutToolbar,
  DsTypography,
} from '@crypto/ui';

import { NOTIFICATION_COUNT } from '~/constants/portal-nav';
import { ConsoleUserMenu } from './ConsoleUserMenu';
export const LeftPart = () => {
  return (
    <DsTypography as={'span'} variant="helperText">
      workspace /{' '}
      <DsTypography as={'span'} variant="body">
        Overview
      </DsTypography>
    </DsTypography>
  );
};

export const ConsoleToolbar = () => {
  return (
    <DsAppLayoutToolbar leftSection={<LeftPart />}>
      <DsAppLayoutSearchBar onSubmit={(query) => console.log({ search: query })} />
      <DsAppLayoutNotifications count={NOTIFICATION_COUNT} />
      <ConsoleUserMenu />
    </DsAppLayoutToolbar>
  );
};
