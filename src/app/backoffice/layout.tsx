"use client";

import { usePathname, useRouter } from "next/navigation";
import { useFirebaseAuth } from "@/lib/firebase/hooks";
import Link from "next/link";
import {
  Users,
  UserCheck,
  CreditCard,
  LayoutDashboard,
  LogOut,
  DollarSign,
} from "lucide-react";
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarNav,
  SidebarNavItem,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";

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
  {
    href: "/backoffice/financeiro",
    label: "Financeiro",
    icon: DollarSign,
  },
];

interface BackofficeLayoutProps {
  children: React.ReactNode;
}

export default function BackofficeLayout({ children }: BackofficeLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, signOut } = useFirebaseAuth();

  console.log(`[BackofficeLayout] Current pathname: ${pathname}`);

  // Rotas que não devem ter o layout de backoffice
  const isAuthPage = 
    pathname?.includes('/sign-in') || 
    pathname?.includes('/sign-up') ||
    pathname?.includes('/access-denied') ||
    pathname?.includes('/force-signout');

  console.log(`[BackofficeLayout] Is auth page: ${isAuthPage}`);

  // Se for página de autenticação, apenas renderiza o children sem layout
  if (isAuthPage) {
    console.log(`[BackofficeLayout] Rendering auth page without sidebar`);
    return <>{children}</>;
  }

  console.log(`[BackofficeLayout] Rendering full layout with sidebar`);

  async function handleSignOut() {
    await signOut();
    router.push('/backoffice/sign-in');
  }

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
                <Link key={item.href} href={item.href}>
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
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-600 text-white font-semibold">
              {user?.email?.charAt(0).toUpperCase() || 'A'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                {user?.email || 'Admin'}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Administrador
              </p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleSignOut}
              className="shrink-0"
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Sidebar>

      <main className="flex-1 overflow-auto">
        <div className="container mx-auto max-w-7xl p-8">{children}</div>
      </main>
    </div>
  );
}
