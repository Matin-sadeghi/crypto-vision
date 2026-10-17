import type { ComponentType, SVGProps } from 'react';

export type DsNavMatch = 'exact' | 'prefix';

export type DsNavIcon = ComponentType<SVGProps<SVGSVGElement> & { size?: number }>;

export type DsNavItem = {
  name: string;
  href: string;
  icon: DsNavIcon;
  unread?: number;
  match?: DsNavMatch;
};

export type DsNavSectionConfig = {
  title: string;
  items: DsNavItem[];
};
