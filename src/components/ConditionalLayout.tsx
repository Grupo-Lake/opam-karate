"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function ConditionalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isBackoffice = pathname?.startsWith("/backoffice");

  if (isBackoffice) {
    // No backoffice, não renderiza Header/Footer
    return <>{children}</>;
  }

  // Páginas públicas têm Header e Footer
  return (
    <>
      <Header />
      <main className="pt-16 md:pt-20 overflow-x-hidden">
        {children}
      </main>
      <Footer />
    </>
  );
}
