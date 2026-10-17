import type { ReactNode } from 'react';

import { DsBox } from '../Box';
import { DsTypography } from '../Typography';

type DsSidebarBrandProps = {
  logo: ReactNode;
  title: string;
};

export const DsSidebarBrand = ({ logo, title }: DsSidebarBrandProps) => {
  return (
    <DsBox className="flex h-16 shrink-0 items-center gap-x-2 px-6 py-10">
      <DsBox className="flex h-10 w-10 shrink-0">{logo}</DsBox>
      <DsTypography variant="h2" color="textPrimary" className="font-bold">
        {title}
      </DsTypography>
    </DsBox>
  );
};
