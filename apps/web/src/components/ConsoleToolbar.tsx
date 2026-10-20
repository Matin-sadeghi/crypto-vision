'use client';

import {
  DsAppLayoutNotifications,
  DsAppLayoutSearchBar,
  DsAppLayoutToolbar,
  DsTypography,
} from '@crypto/ui';

import { NOTIFICATION_COUNT } from '~/constants/portal-nav';
import { ConsoleUserMenu } from './ConsoleUserMenu';
import { DsCustomButton } from '@crypto/ui';
import { useThemeStore } from '@crypto/frontend-core';
import { Moon, Sun } from 'lucide-react';
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
  const { toggleTheme, theme } = useThemeStore();
  return (
    <DsAppLayoutToolbar leftSection={<LeftPart />}>
      <DsAppLayoutSearchBar onSubmit={(query) => console.log({ search: query })} />
      <DsAppLayoutNotifications count={NOTIFICATION_COUNT} />
      <DsCustomButton size="sm" variant="ghost" onClick={toggleTheme}>
        {theme === 'dark' ? <Moon /> : <Sun />}
      </DsCustomButton>
      <ConsoleUserMenu />
    </DsAppLayoutToolbar>
  );
};
