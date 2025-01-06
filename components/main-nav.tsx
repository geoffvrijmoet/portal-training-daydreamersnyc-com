"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname();

  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      <Link
        href="/"
        className="text-xl font-medium transition-colors hover:text-primary"
      >
        Daydreamers Portal
      </Link>
      <Link
        href="/dashboard"
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary",
          pathname === "/dashboard"
            ? "text-primary"
            : "text-muted-foreground"
        )}
      >
        Dashboard
      </Link>
      <Link
        href="/report-cards"
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary",
          pathname === "/report-cards"
            ? "text-primary"
            : "text-muted-foreground"
        )}
      >
        Report Cards
      </Link>
      <Link
        href="/resources"
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary",
          pathname === "/resources"
            ? "text-primary"
            : "text-muted-foreground"
        )}
      >
        Resources
      </Link>
    </nav>
  );
} 