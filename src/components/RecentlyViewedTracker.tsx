"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { paletteRoutes } from "@/data/paletteRoutes";
import { recordVisit } from "@/lib/recentlyViewed";

export function RecentlyViewedTracker() {
  const pathname = usePathname();

  useEffect(() => {
    const route = paletteRoutes.find((r) => r.href === pathname);
    if (!route || route.href === "/") return;
    recordVisit({ href: route.href, title: route.title, icon: route.icon });
  }, [pathname]);

  return null;
}
