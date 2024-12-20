"use client";

import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { MainNav } from "@/components/main-nav";

export function MobileNav({ className }: { className?: string }) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className={className}>
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-80">
        <MainNav className="flex flex-col items-start space-x-0 space-y-4" />
      </SheetContent>
    </Sheet>
  );
} 