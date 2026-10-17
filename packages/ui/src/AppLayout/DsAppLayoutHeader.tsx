import type { ReactNode } from 'react';

import { DsBox } from '../Box';

type DsAppLayoutHeaderProps = {
  children: ReactNode;
};

export const DsAppLayoutHeader = ({ children }: DsAppLayoutHeaderProps) => {
  return (
    <DsBox
      borderColor="border"
      bg="background"
      className="py-10 sticky top-0 z-40 flex h-16 shrink-0 items-center px-8 shadow-xs border-b w-full"
    >
      {children}
    </DsBox>
  );
};
