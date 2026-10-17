import { DsBox } from '../Box';
import { DsLink } from '../Link';
import { DsTypography } from '../Typography';
import type { DsNavItem } from './app-layout.types';
import { isNavItemActive } from './is-nav-item-active';

type DsNavSectionProps = {
  title: string;
  items: DsNavItem[];
};

export const DsNavSection = ({ title, items }: DsNavSectionProps) => {
  // const { pathname } = useLocation();
  const pathname = '/';
  return (
    <DsBox>
      <DsTypography variant="caption" color="textMuted" className="mt-3 pb-2 font-semibold">
        {title}
      </DsTypography>

      <DsBox role="list" className="-mx-2 ">
        {items.map((item) => {
          const isActive = isNavItemActive(pathname, item.href, item.match);
          const Icon = item.icon;
          const unreadCount = item.unread ?? 0;

          return (
            <DsBox
              className="rounded-md"
              bg={isActive ? 'tertiary50' : 'background'}
              key={item.href}
            >
              <DsLink
                color="textPrimary"
                href={item.href}
                className="group flex gap-x-3 rounded-md p-2 font-semibold"
              >
                <Icon aria-hidden="true" size={20} strokeWidth={1.7} className="shrink-0" />

                <DsBox className="flex w-full items-center justify-between gap-2">
                  <DsTypography
                    variant="helperText"
                    color={isActive ? 'tertiary' : 'textPrimary'}
                    className="font-semibold"
                  >
                    {item.name}
                  </DsTypography>

                  {unreadCount > 0 ? (
                    <DsBox
                      bg="tertiary100"
                      className="flex h-6 w-6 items-center justify-center rounded-md"
                    >
                      <DsTypography color="tertiary" variant="helperText">
                        {unreadCount}
                      </DsTypography>
                    </DsBox>
                  ) : null}
                </DsBox>
              </DsLink>
            </DsBox>
          );
        })}
      </DsBox>
    </DsBox>
  );
};
