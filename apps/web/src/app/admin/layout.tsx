import { DsAppLayout } from '@crypto/ui';
import type { Metadata } from 'next';
import { AdminAuthGuard, ConsoleSidebar, ConsoleToolbar } from '~/components';

export const metadata: Metadata = {
  title: 'Admin',
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AdminAuthGuard>
      <DsAppLayout sidebar={<ConsoleSidebar />} toolbar={<ConsoleToolbar />}>
        {children}
      </DsAppLayout>
    </AdminAuthGuard>
  );
}
