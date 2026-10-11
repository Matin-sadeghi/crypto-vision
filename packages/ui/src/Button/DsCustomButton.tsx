import clsx from 'clsx';
import { forwardRef, type ReactNode } from 'react';
import type React from 'react';

import { colors, type ColorType } from '../constant/color';

export type DsCustomButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'custom';
export type DsCustomButtonPadding = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'custom';

type DsCustomButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  color?: ColorType;
  borderColor?: ColorType;
  textColor?: ColorType;
  variant?: 'solid' | 'outline' | 'ghost';
  size?: DsCustomButtonSize;
  padding?: DsCustomButtonPadding;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
};

const sizeClasses: Record<Exclude<DsCustomButtonSize, 'custom'>, string> = {
  xs: 'text-xs',
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
};

const paddingClasses: Record<Exclude<DsCustomButtonPadding, 'custom'>, string> = {
  none: 'p-0',
  xs: 'px-2 py-1',
  sm: 'px-3 py-1.5',
  md: 'px-4 py-2',
  lg: 'px-5 py-3',
};

const defaultPaddingBySize: Record<
  Exclude<DsCustomButtonSize, 'custom'>,
  Exclude<DsCustomButtonPadding, 'custom'>
> = {
  xs: 'xs',
  sm: 'sm',
  md: 'md',
  lg: 'lg',
};

const lightSolidBackgrounds = new Set<ColorType>([
  'white',
  'background',
  'cardBackground',
  'sidebarBackground',
  'tertiary50',
  'tertiary100',
  'tertiary200',
  'success200',
  'warning200',
  'danger200',
  'info200',
  'iconSurface',
  'primary',
  'warning',
]);

function resolveSolidTextColor(color: ColorType) {
  if (color === 'primary' || color === 'warning') {
    return colors.textYellowBtn;
  }

  if (lightSolidBackgrounds.has(color)) {
    return colors.textHeading;
  }

  if (color.startsWith('text')) {
    return colors.textInverse;
  }

  return colors.white;
}

function resolveButtonStyle({
  color,
  borderColor,
  textColor,
  variant,
}: {
  color: ColorType;
  borderColor?: ColorType;
  textColor?: ColorType;
  variant: 'solid' | 'outline' | 'ghost';
}): React.CSSProperties {
  const accentColor = colors[color];
  const resolvedBorderColor = colors[borderColor ?? color];

  if (variant === 'outline') {
    return {
      backgroundColor: 'transparent',
      borderColor: resolvedBorderColor,
      color: textColor ? colors[textColor] : accentColor,
    };
  }

  if (variant === 'ghost') {
    return {
      backgroundColor: 'transparent',
      borderColor: 'transparent',
      color: textColor ? colors[textColor] : accentColor,
    };
  }

  return {
    backgroundColor: accentColor,
    borderColor: resolvedBorderColor,
    color: textColor ? colors[textColor] : resolveSolidTextColor(color),
  };
}

function ButtonIcon({ children }: { children: ReactNode }) {
  return <span className="inline-flex shrink-0 items-center justify-center">{children}</span>;
}

export const DsCustomButton = forwardRef<HTMLButtonElement, DsCustomButtonProps>(
  function DsCustomButton(
    {
      color = 'primary',
      borderColor,
      textColor,
      className,
      children,
      style,
      variant = 'solid',
      size = 'md',
      padding,
      startIcon,
      endIcon,
      ...props
    },
    ref,
  ) {
    const resolvedPadding = padding ?? (size === 'custom' ? 'custom' : defaultPaddingBySize[size]);
    const hasIcon = Boolean(startIcon || endIcon);

    return (
      <button
        ref={ref}
        {...props}
        className={clsx(
          'inline-flex items-center justify-center rounded-lg font-medium transition-all',
          variant === 'ghost' ? 'border border-transparent' : 'border',
          'cursor-pointer disabled:cursor-not-allowed disabled:opacity-50',
          hasIcon && 'gap-2',
          size !== 'custom' && sizeClasses[size],
          resolvedPadding !== 'custom' && paddingClasses[resolvedPadding],
          className,
        )}
        style={{
          ...resolveButtonStyle({ color, borderColor, textColor, variant }),
          ...style,
        }}
      >
        {startIcon ? <ButtonIcon>{startIcon}</ButtonIcon> : null}
        {children}
        {endIcon ? <ButtonIcon>{endIcon}</ButtonIcon> : null}
      </button>
    );
  },
);
