import clsx from 'clsx';

import { DsAvatar } from './DsAvatar';

type DsAvatarGroupSize = 'sm' | 'md' | 'lg';

type DsAvatarGroupProps = {
  /** Image URLs to render as an overlapping avatar stack. */
  images: string[];
  size?: DsAvatarGroupSize;
  className?: string;
};

const sizeClasses: Record<DsAvatarGroupSize, string> = {
  sm: 'size-6',
  md: 'size-8',
  lg: 'size-10',
};

export function DsAvatarGroup({ images, size = 'md', className }: DsAvatarGroupProps) {
  if (images.length === 0) return null;

  return (
    <div
      className={clsx('flex items-center justify-center -space-x-2', className)}
      role="list"
      aria-label="Users"
    >
      {images.map((src, index) => (
        <DsAvatar
          key={`${src}-${index}`}
          src={src}
          className={clsx(sizeClasses[size], 'ring-2 ring-white dark:ring-zinc-900')}
          role="listitem"
        />
      ))}
    </div>
  );
}
