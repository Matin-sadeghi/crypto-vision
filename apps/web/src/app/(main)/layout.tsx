import { DsAppLayout } from '@crypto/ui';
import type { Metadata } from 'next';
import { ConsoleSidebar } from '~/components/ConsoleSidebar';
import { ConsoleToolbar } from '~/components/ConsoleToolbar';
export const metadata: Metadata = {
  title: 'Dashboard',
};

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <DsAppLayout sidebar={<ConsoleSidebar />} toolbar={<ConsoleToolbar />}>
      {children}
    </DsAppLayout>
  );
}
