import type { ReactNode } from 'react';

import { DsBox } from '../Box';
import { DsAppLayoutHeader } from './DsAppLayoutHeader';

type DsAppLayoutProps = {
  sidebar: ReactNode;
  toolbar: ReactNode;
  children: ReactNode;
};

export const DsAppLayout = ({ sidebar, toolbar, children }: DsAppLayoutProps) => {
  return (
    <DsBox>
      <DsBox borderColor="border" className="fixed inset-y-0 z-50 flex w-72 flex-col border-r">
        {sidebar}
      </DsBox>

      <DsBox bg="background" className="flex min-h-screen flex-col pl-72">
        <DsAppLayoutHeader>{toolbar}</DsAppLayoutHeader>

        <DsBox className="flex-1 py-10">
          <DsBox className="h-full pl-10 pr-20">{children}</DsBox>
        </DsBox>
      </DsBox>
    </DsBox>
  );
};
