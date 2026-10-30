import { DsAppLayout } from '@crypto/ui';
import type { Metadata } from 'next';
import { AuthGuard, ConsoleSidebar, ConsoleToolbar } from '~/components';

export const metadata: Metadata = {
  title: 'Dashboard',
};

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthGuard>
      <DsAppLayout sidebar={<ConsoleSidebar />} toolbar={<ConsoleToolbar />}>
        {children}
      </DsAppLayout>
    </AuthGuard>
  );
}
