import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { ChevronDownIcon } from 'lucide-react';

import { DsAvatar } from '../Avatar';
import { DsBox } from '../Box';
import { DsLink } from '../Link';
import { DsTypography } from '../Typography';

export type DsAppLayoutUserMenuItem =
  | { name: string; href: string }
  | { name: string; action: 'logout' };

type DsAppLayoutUserMenuProps = {
  displayName?: string;
  displayRole?: string;
  avatarUrl?: string;
  items: DsAppLayoutUserMenuItem[];
  onLogout?: () => void;
  isLogoutPending?: boolean;
};

export const DsAppLayoutUserMenu = ({
  displayName,
  displayRole,
  avatarUrl,
  items,
  onLogout,
  isLogoutPending = false,
}: DsAppLayoutUserMenuProps) => {
  return (
    <Menu as="div" className="relative">
      <MenuButton className="-m-1.5 flex items-center border-0 bg-transparent p-1.5 outline-hidden focus:outline-hidden data-focus:outline-hidden">
        <DsBox className="sr-only">Open user menu</DsBox>
        <DsAvatar src={avatarUrl} className="size-8" />
        <DsBox className="flex cursor-pointer items-center">
          <DsBox className="ml-2 flex flex-col items-start">
            <DsTypography variant="helperText" color="textPrimary" className="font-medium">
              {displayName}
            </DsTypography>
            {displayRole ? (
              <DsTypography variant="caption" color="textMuted" className="font-medium">
                {displayRole}
              </DsTypography>
            ) : null}
          </DsBox>
          <DsBox color="textPrimary">
            <ChevronDownIcon aria-hidden="true" className="ml-2" size={20} strokeWidth={2} />
          </DsBox>
        </DsBox>
      </MenuButton>
      <MenuItems
        transition
        style={{
          backgroundColor: 'var(--color-card-background)',
          borderColor: 'var(--border-card)',
          boxShadow: 'var(--shadow-card)',
        }}
        className="absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md border py-2 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
      >
        {items.map((item) => (
          <MenuItem key={item.name}>
            {'action' in item ? (
              <button
                type="button"
                disabled={isLogoutPending}
                onClick={onLogout}
                className="flex w-full items-center gap-2 border-0 bg-transparent px-5 py-2 text-left data-focus:bg-[var(--color-tertiary-50)] data-focus:outline-hidden disabled:opacity-50"
              >
                <DsTypography variant="helperText" color="textPrimary" className="font-medium">
                  {item.name}
                </DsTypography>
              </button>
            ) : (
              <DsLink
                href={item.href}
                color="secondary"
                className="flex items-center gap-2 px-5 py-2 data-focus:bg-[var(--color-tertiary-50)] data-focus:outline-hidden"
              >
                <DsTypography variant="helperText" color="textPrimary" className="font-medium">
                  {item.name}
                </DsTypography>
              </DsLink>
            )}
          </MenuItem>
        ))}
      </MenuItems>
    </Menu>
  );
};
