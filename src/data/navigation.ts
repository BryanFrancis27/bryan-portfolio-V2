import { Contact, Gauge, History, Layers3, UserRoundCog } from "lucide-react";

export const navigationItems = [
  { label: "Command Center", href: "/command-center", icon: Gauge },
  { label: "System Registry", href: "/systems", icon: Layers3 },
  { label: "Foundation Timeline", href: "/timeline", icon: History },
  { label: "Experience Matrix", href: "/experience", icon: UserRoundCog },
  { label: "Contact Channel", href: "/contact", icon: Contact },
] as const;

export type NavigationHref = (typeof navigationItems)[number]["href"];
export type NavigationDirection = "forward" | "backward" | "neutral";

export const navigationRouteIndex = navigationItems.reduce<Record<NavigationHref, number>>(
  (routeIndex, item, index) => {
    routeIndex[item.href] = index;
    return routeIndex;
  },
  {} as Record<NavigationHref, number>,
);

export function getNavigationRouteIndex(pathname: string) {
  return navigationRouteIndex[pathname as NavigationHref];
}

export function isPrimaryNavigationRoute(pathname: string) {
  return getNavigationRouteIndex(pathname) !== undefined;
}

export function getNavigationDirection(fromPathname: string | null, toPathname: string): NavigationDirection {
  if (!fromPathname || fromPathname === toPathname) {
    return "neutral";
  }

  const fromIndex = getNavigationRouteIndex(fromPathname);
  const toIndex = getNavigationRouteIndex(toPathname);

  if (fromIndex === undefined || toIndex === undefined) {
    return "neutral";
  }

  if (toIndex > fromIndex) {
    return "forward";
  }

  if (toIndex < fromIndex) {
    return "backward";
  }

  return "neutral";
}
