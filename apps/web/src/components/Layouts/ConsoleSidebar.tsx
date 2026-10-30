import { DsLogoCard, DsNavSection, DsSidebar, DsSidebarBrand } from '@crypto/ui';

import { NAV_SECTIONS } from '~/constants/portal-nav';
import { WORDS } from '~/constants/words';

export const ConsoleSidebar = () => {
  return (
    <DsSidebar
      brand={
        <DsSidebarBrand
          logo={<DsLogoCard onlyLogo alt={WORDS.DASHBOARD.DESCRIPTION} />}
          title="Crypto Vision"
        />
      }
    >
      {NAV_SECTIONS.map((section) => (
        <DsNavSection key={section.title} title={section.title} items={section.items} />
      ))}
    </DsSidebar>
  );
};
