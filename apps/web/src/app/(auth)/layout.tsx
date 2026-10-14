import type { Metadata } from 'next';
import { DsBox } from '@crypto/ui';
export const metadata: Metadata = {
  title: 'Signup/Signin',
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <DsBox bg="background" className="flex min-h-dvh flex-col">
      <DsBox className="flex grow items-center justify-center p-6 lg:rounded-lg ">{children}</DsBox>
    </DsBox>
  );
}
