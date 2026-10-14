import clsx from 'clsx';
import type { ReactNode } from 'react';

import { DsBox } from '../Box';

type DsInputIconSlotProps = {
  children: ReactNode;
  className?: string;
};

export function DsInputIconSlot({ children, className }: DsInputIconSlotProps) {
  return (
    <DsBox
      color="textMuted"
      className={clsx('!top-1/2 flex !-translate-y-1/2 items-center justify-center', className)}
      data-slot="icon"
    >
      {children}
    </DsBox>
  );
}
