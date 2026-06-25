"use client";

import { usePathname } from "next/navigation";
import { PageTransition } from "@/components/dashboard/PageTransition";
import { isPrimaryNavigationRoute } from "@/data/navigation";
import { DashboardShell } from "./DashboardShell";

export function DashboardRouteFrame({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  if (!isPrimaryNavigationRoute(pathname)) {
    return children;
  }

  return (
    <DashboardShell>
      <PageTransition>{children}</PageTransition>
    </DashboardShell>
  );
}
