import clsx from 'clsx';
import type { ReactNode } from 'react';

import { colors, type ColorType } from '../constant/color';
import { DsBox } from '../Box';

type DsCustomCardRadius = 'lg' | '2xl';
type DsCustomCardPadding = 'sm' | 'md';
type DsCustomCardBorderWidth = 1 | 2;
type DsCustomCardBg = ColorType | 'transparent';

type DsCustomCardProps = {
  children: ReactNode;
  className?: string;
  radius?: DsCustomCardRadius;
  padding?: DsCustomCardPadding;
  borderWidth?: DsCustomCardBorderWidth;
  borderColor?: ColorType;
  shadow?: boolean;
  bg?: DsCustomCardBg;
};

const radiusClasses: Record<DsCustomCardRadius, string> = {
  lg: 'rounded-lg',
  '2xl': 'rounded-2xl',
};

const paddingClasses: Record<DsCustomCardPadding, string> = {
  sm: 'p-5',
  md: 'p-8',
};

const borderWidthClasses: Record<DsCustomCardBorderWidth, string> = {
  1: 'border',
  2: 'border-2',
};

const resolveBackgroundColor = (bg?: DsCustomCardBg) => {
  if (!bg) return undefined;
  if (bg === 'transparent') return 'transparent';
  return colors[bg];
};

export const DsCustomCard = ({
  children,
  className,
  radius = '2xl',
  padding = 'sm',
  borderWidth = 1,
  borderColor = 'borderCard',
  shadow = true,
  bg,
}: DsCustomCardProps) => {
  const backgroundColor = resolveBackgroundColor(bg);

  return (
    <DsBox
      className={clsx(
        borderWidthClasses[borderWidth],
        radiusClasses[radius],
        paddingClasses[padding],
        className,
      )}
      style={{
        borderColor: colors[borderColor],
        boxShadow: shadow ? colors.shadowCard : undefined,
        ...(backgroundColor ? { backgroundColor } : {}),
      }}
    >
      {children}
    </DsBox>
  );
};
