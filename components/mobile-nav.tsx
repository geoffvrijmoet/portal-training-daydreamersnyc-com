"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

export function MobileNav({ className }: { className?: string }) {
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className={cn(
            "px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0",
            className
          )}
        >
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="pr-0">
        <nav className="flex flex-col space-y-4">
          <Link
            href="/"
            className="text-lg font-medium"
            onClick={() => setOpen(false)}
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
            onClick={() => setOpen(false)}
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
            onClick={() => setOpen(false)}
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
            onClick={() => setOpen(false)}
          >
            Resources
          </Link>
        </nav>
      </SheetContent>
    </Sheet>
  );
} 