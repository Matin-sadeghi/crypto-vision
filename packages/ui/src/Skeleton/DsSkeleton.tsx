import clsx from 'clsx';
import type React from 'react';

import { colors } from '../constant/color';

export type DsSkeletonVariant = 'rect' | 'text' | 'circle';

type DsSkeletonProps = {
  /** Shape preset. `text` is a single line, `circle` is a round avatar-style block. */
  variant?: DsSkeletonVariant;
  width?: number | string;
  height?: number | string;
  className?: string;
} & Omit<React.HTMLAttributes<HTMLDivElement>, 'children'>;

const variantClasses: Record<DsSkeletonVariant, string> = {
  rect: 'rounded-md',
  text: 'h-4 w-full rounded-md',
  circle: 'rounded-full',
};

export const DsSkeleton = ({
  variant = 'rect',
  width,
  height,
  className,
  style,
  ...props
}: DsSkeletonProps) => {
  // A circle stays square unless told otherwise.
  const resolvedHeight = variant === 'circle' && height === undefined ? width : height;

  return (
    <div
      {...props}
      aria-hidden="true"
      className={clsx('animate-pulse', variantClasses[variant], className)}
      style={{
        backgroundColor: colors.textMuted200,
        width,
        height: resolvedHeight,
        ...style,
      }}
    />
  );
};

type DsSkeletonTextProps = {
  /** Number of lines to render. */
  lines?: number;
  /** Width of the last line, to mimic a paragraph's ragged end. */
  lastLineWidth?: number | string;
  className?: string;
};

export const DsSkeletonText = ({
  lines = 3,
  lastLineWidth = '66%',
  className,
}: DsSkeletonTextProps) => {
  return (
    <div className={clsx('space-y-2', className)}>
      {Array.from({ length: lines }).map((_, index) => (
        <DsSkeleton
          key={index}
          variant="text"
          width={index === lines - 1 ? lastLineWidth : undefined}
        />
      ))}
    </div>
  );
};
