"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import StickyTrialBar from "@/components/site/StickyTrialBar";

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

  // Páginas públicas: sistema visual "papel e tinta" do redesign
  return (
    <div className="font-display bg-paper text-ink min-h-screen">
      <Header />
      <main className="overflow-x-hidden">{children}</main>
      <Footer />
      <StickyTrialBar />
    </div>
  );
}
