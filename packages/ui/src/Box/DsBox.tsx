import React from 'react';
import clsx from 'clsx';

import { colors, type ColorType } from '../constant/color';

type DsBoxProps = {
  children?: React.ReactNode;

  bg?: ColorType;
  color?: ColorType;
  borderColor?: ColorType;

  as?: React.ElementType;

  className?: string;
} & React.HTMLAttributes<HTMLElement>;

export const DsBox = ({
  children,
  bg,
  color,
  borderColor,
  as: Component = 'div',
  className,
  style,
  ...props
}: DsBoxProps) => {
  return (
    <Component
      {...props}
      className={clsx(className)}
      style={{
        backgroundColor: bg ? colors[bg] : undefined,
        color: color ? colors[color] : undefined,
        borderColor: borderColor ? colors[borderColor] : undefined,
        ...style,
      }}
    >
      {children}
    </Component>
  );
};
