"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText } from "lucide-react"
import Link from "next/link"
import { useReportCards } from "@/hooks/use-report-cards"

export function RecentReportCards() {
  const { reportCards, isLoading, error } = useReportCards()

  // Get only the 3 most recent report cards
  const recentReportCards = reportCards?.slice(0, 3)

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-fredoka font-light">Recent Report Cards</CardTitle>
        <Link href="/report-cards">
          <Button variant="ghost" size="sm" className="font-quicksand">View all</Button>
        </Link>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {isLoading ? (
            <p className="text-muted-foreground font-quicksand">Loading report cards...</p>
          ) : error ? (
            <p className="text-red-500 font-quicksand">Error loading report cards</p>
          ) : recentReportCards?.length === 0 ? (
            <p className="text-muted-foreground font-quicksand">No report cards found.</p>
          ) : (
            recentReportCards?.map((report) => (
              <Link 
                key={report._id}
                href={`/report-cards/${report._id}`}
                className="flex items-center space-x-4 rounded-lg border p-4 transition-colors hover:bg-muted"
              >
                <FileText className="h-6 w-6 text-primary" />
                <div className="flex-1 space-y-1">
                  <p className="font-fredoka font-light leading-none">{report.title}</p>
                  <p className="text-sm text-muted-foreground font-quicksand">
                    {new Date(report.date).toLocaleDateString()}
                  </p>
                </div>
              </Link>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  )
} 