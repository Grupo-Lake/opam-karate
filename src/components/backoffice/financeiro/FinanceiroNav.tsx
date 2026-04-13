"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BarChart3, FileText, Wallet } from "lucide-react";

const tabs = [
  {
    href: "/backoffice/financeiro",
    label: "Dashboard",
    icon: BarChart3,
  },
  {
    href: "/backoffice/financeiro/cobrancas",
    label: "Cobranças",
    icon: FileText,
  },
  {
    href: "/backoffice/financeiro/pagamentos",
    label: "Pagamentos",
    icon: Wallet,
  },
];

export function FinanceiroNav() {
  const pathname = usePathname();

  return (
    <div className="mb-6 border-b border-gray-200 dark:border-gray-700">
      <nav className="-mb-px flex space-x-8">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive =
            pathname === tab.href ||
            (tab.href !== "/backoffice/financeiro" &&
              pathname?.startsWith(tab.href));

          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={`
                flex items-center gap-2 border-b-2 px-1 py-4 text-sm font-medium transition-colors
                ${
                  isActive
                    ? "border-primary text-primary"
                    : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                }
              `}
            >
              <Icon className="h-5 w-5" />
              {tab.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
