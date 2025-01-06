"use client"

import { useUser } from "@clerk/nextjs"
import { WelcomeCard } from "@/components/dashboard/welcome-card"
import { RecentReportCards } from "@/components/dashboard/recent-report-cards"
import { QuickResources } from "@/components/dashboard/quick-resources"
import { useEffect, useState } from "react"

export default function HomePage() {
  const { isSignedIn } = useUser()
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  return (
    <div 
      className={`space-y-6 transition-all duration-500
        ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
    >
      <WelcomeCard />
      <div className="grid gap-6 md:grid-cols-2">
        <RecentReportCards />
        <QuickResources />
      </div>
    </div>
  )
}
