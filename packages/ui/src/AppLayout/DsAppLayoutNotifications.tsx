import { BellIcon } from 'lucide-react';

import { DsBox } from '../Box';
import { DsTypography } from '../Typography';

type DsAppLayoutNotificationsProps = {
  count?: number;
  onClick?: () => void;
};

export const DsAppLayoutNotifications = ({ count = 0, onClick }: DsAppLayoutNotificationsProps) => {
  return (
    <DsBox
      color="textMuted"
      className="cursor-pointer border-0 bg-transparent p-0 hover:text-gray-500"
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={
        onClick
          ? (event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                onClick();
              }
            }
          : undefined
      }
    >
      <DsBox className="sr-only">View notifications</DsBox>
      <DsBox color="textPrimary" className="flex items-center">
        <BellIcon size={25} strokeWidth={2} />
        {count > 0 ? (
          <DsBox
            bg="textPrimary"
            className="ml-[-10px] mt-[-18px] flex h-4 w-4 items-center justify-center rounded-full"
          >
            <DsTypography color="textMuted200" variant="caption">
              {count}
            </DsTypography>
          </DsBox>
        ) : null}
      </DsBox>
    </DsBox>
  );
};
