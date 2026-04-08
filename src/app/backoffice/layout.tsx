"use client";

import { UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  Users,
  UserCheck,
  CreditCard,
  LayoutDashboard,
} from "lucide-react";
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarNav,
  SidebarNavItem,
} from "@/components/ui/sidebar";

const navItems = [
  {
    href: "/backoffice",
    label: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    href: "/backoffice/alunos",
    label: "Alunos",
    icon: Users,
  },
  {
    href: "/backoffice/responsaveis",
    label: "Responsáveis",
    icon: UserCheck,
  },
  {
    href: "/backoffice/planos",
    label: "Planos",
    icon: CreditCard,
  },
];

interface BackofficeLayoutProps {
  children: React.ReactNode;
}

export default function BackofficeLayout({ children }: BackofficeLayoutProps) {
  const pathname = usePathname();

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-600">
              <span className="text-lg font-bold text-white">O</span>
            </div>
            <div>
              <h1 className="text-sm font-bold text-gray-900 dark:text-white">
                OPAM KARATE
              </h1>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                Backoffice
              </span>
            </div>
          </div>
        </SidebarHeader>

        <SidebarContent>
          <SidebarNav>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <Link key={item.href} href={item.href} legacyBehavior passHref>
                  <SidebarNavItem active={isActive}>
                    <Icon className="h-5 w-5" />
                    <span>{item.label}</span>
                  </SidebarNavItem>
                </Link>
              );
            })}
          </SidebarNav>
        </SidebarContent>

        <div className="border-t p-4">
          <div className="flex items-center gap-3">
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-10 h-10",
                },
              }}
            />
            <div className="flex-1 text-sm">
              <p className="font-medium text-gray-900 dark:text-white">Admin</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Gerenciar conta
              </p>
            </div>
          </div>
        </div>
      </Sidebar>

      <main className="flex-1 overflow-auto">
        <div className="container mx-auto max-w-7xl p-8">{children}</div>
      </main>
    </div>
  );
}
