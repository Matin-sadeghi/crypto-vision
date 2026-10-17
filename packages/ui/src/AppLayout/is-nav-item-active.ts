import type { DsNavMatch } from './app-layout.types';

export const isNavItemActive = (pathname: string, href: string, match: DsNavMatch = 'prefix') => {
  if (match === 'exact') {
    return pathname === href;
  }

  return pathname === href || pathname.startsWith(`${href}/`);
};
