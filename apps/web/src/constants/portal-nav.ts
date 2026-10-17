import type { DsNavSectionConfig } from '@crypto/ui';
import { ChartLine, FileText, HomeIcon, IdCard, UsersRound } from 'lucide-react';
import { ROUTES } from './routes';

export const NAV_SECTIONS: DsNavSectionConfig[] = [
  {
    title: 'WORKSPACE',
    items: [
      { name: 'Overview', href: ROUTES.DASHBOARD.OVERVIEW, icon: HomeIcon },
      { name: 'Markets', href: ROUTES.DASHBOARD.MARKETS, icon: ChartLine },
      { name: 'My watchlist', href: ROUTES.DASHBOARD.MY_WATCHLIST, icon: FileText },
      { name: 'AI analysis', href: ROUTES.DASHBOARD.AI_ANALYSIS, icon: FileText },
      { name: 'News & events', href: ROUTES.DASHBOARD.NEWS_EVENTS, icon: FileText },
    ],
  },
  {
    title: 'TOOLS',
    items: [
      { name: 'Profolio tracker', href: ROUTES.DASHBOARD.PROFOLIO_TRACKER, icon: UsersRound },
      { name: 'Price alerts', href: ROUTES.DASHBOARD.PRICE_ALERTS, icon: IdCard },
    ],
  },
];

export type UserNavItem = { name: string; href: string } | { name: string; action: 'logout' };

export const USER_NAVIGATION: UserNavItem[] = [
  { name: 'Your profile', href: ROUTES.DASHBOARD.OVERVIEW },
  { name: 'Sign out', action: 'logout' },
];

export const NOTIFICATION_COUNT = 5;
