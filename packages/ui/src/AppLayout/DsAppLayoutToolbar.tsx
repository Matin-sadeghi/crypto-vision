import type { ReactNode } from 'react';

import { DsBox } from '../Box';

type DsAppLayoutToolbarProps = {
  leftSection?: ReactNode;
  children: ReactNode;
};

export const DsAppLayoutToolbar = ({ leftSection, children }: DsAppLayoutToolbarProps) => {
  return (
    <DsBox className="flex flex-1 justify-between gap-x-6 self-stretch">
      {leftSection ? (
        <DsBox className="flex w-1/3 items-center justify-start">{leftSection}</DsBox>
      ) : null}
      <DsBox className="flex items-center gap-x-6">{children}</DsBox>
    </DsBox>
  );
};
