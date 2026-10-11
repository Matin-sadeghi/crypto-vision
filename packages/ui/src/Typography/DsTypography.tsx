import React from 'react';

import { colors, type ColorType } from '../constant/color';
import { typography, type TypographyVariant } from '../constant/typography';

type TypographyProps = {
  variant?: TypographyVariant;
  color?: ColorType;

  children: React.ReactNode;

  as?: React.ElementType;

  className?: string;
};

export const DsTypography = ({
  variant = 'body',
  color = 'textPrimary',
  children,
  as: Component = 'p',
  className = '',
}: TypographyProps) => {
  return (
    <Component
      className={className}
      style={{
        ...typography[variant],
        color: colors[color],
      }}
    >
      {children}
    </Component>
  );
};
