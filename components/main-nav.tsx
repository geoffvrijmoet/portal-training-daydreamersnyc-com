"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <nav
      className={cn("w-full flex items-center justify-center md:justify-start md:pl-[50px]", className)}
      {...props}
    >
      <Link href="/" className="transition-opacity hover:opacity-80">
        <Image
          src="/images/daydreamers-dog-training-logo.webp"
          alt="Daydreamers Dog Training"
          width={300}
          height={300}
          priority
        />
      </Link>
    </nav>
  );
} 