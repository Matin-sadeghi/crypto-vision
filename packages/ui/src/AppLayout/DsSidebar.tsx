import type { ReactNode } from 'react';

import { DsBox } from '../Box';

type DsSidebarProps = {
  brand: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
};

export const DsSidebar = ({ brand, children, footer }: DsSidebarProps) => {
  return (
    <DsBox bg="background" className="flex min-h-0 grow flex-col overflow-x-hidden">
      <DsBox className="shrink-0">{brand}</DsBox>

      <DsBox className="custom-scrollbar min-h-0 flex-1 overflow-y-auto overflow-x-hidden">
        <DsBox className="flex flex-col space-y-3 px-6 py-4">{children}</DsBox>
      </DsBox>

      {footer ? <DsBox className="shrink-0 px-6 pb-4">{footer}</DsBox> : null}
    </DsBox>
  );
};
