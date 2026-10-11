import * as Headless from '@headlessui/react';
import clsx from 'clsx';
import React, { forwardRef } from 'react';
import Link from 'next/link';
import { colors, type ColorType } from '../constant/color';

type DsLinkProps = Omit<
  React.ComponentPropsWithoutRef<typeof Link>,
  'className' | 'style'
> & {
  bg?: ColorType;
  color?: ColorType;
  className?: string;
  style?: React.CSSProperties;
};

export const DsLink = forwardRef<HTMLAnchorElement, DsLinkProps>(function DsLink(
  { href, bg, color, className, style, ...props }: DsLinkProps,
  ref,
) {
  return (
    <Headless.DataInteractive>
      <Link
        href={href}
        {...props}
        ref={ref}
        className={clsx(className)}
        style={{
          backgroundColor: bg ? colors[bg] : undefined,
          color: color ? colors[color] : undefined,
          ...style,
        }}
      />
    </Headless.DataInteractive>
  );
});
