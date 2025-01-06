"use client"

import { useUser } from "@clerk/nextjs"
import { redirect } from "next/navigation"

export default function HomePage() {
  const { isSignedIn } = useUser()

  if (isSignedIn) {
    redirect("/dashboard")
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] py-12 text-center">
      <h1 className="text-4xl font-fredoka font-light tracking-tight mb-4">
        Welcome to Daydreamers Dog Training Portal
      </h1>
      <p className="text-xl text-muted-foreground mb-8 max-w-2xl font-quicksand">
        Access your training materials, report cards, and resources all in one place.
        Sign in to get started.
      </p>
    </div>
  )
}
