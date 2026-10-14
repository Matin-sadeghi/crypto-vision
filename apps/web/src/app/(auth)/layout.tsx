import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Signup/Signin",
};


export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-10">
      {children}
    </main>
  );
}
