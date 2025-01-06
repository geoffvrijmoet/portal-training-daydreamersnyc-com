"use client"

import { WelcomeCard } from "@/components/dashboard/welcome-card"
import { RecentReportCards } from "@/components/dashboard/recent-report-cards"
import { QuickResources } from "@/components/dashboard/quick-resources"

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-fredoka font-light tracking-tight">Dashboard</h2>
      </div>
      <div className="grid gap-6">
        <WelcomeCard />
        <div className="grid gap-6 md:grid-cols-2">
          <RecentReportCards />
          <QuickResources />
        </div>
      </div>
    </div>
  )
} 